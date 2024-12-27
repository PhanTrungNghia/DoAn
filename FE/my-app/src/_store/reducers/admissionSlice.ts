import {
    createAsyncThunk,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit"
import { message } from "antd";
import { fetchWrapper } from "../../_helpers/fetch-wrapper";

// initial admin function state
const initialState: AdmissionState = {
    admissions: [
        {
            STT: "123",
            SoBaoDanh: "2055010189",
            MaHoSo: "MHS1"

        },
    ],
    pending: true,
}

export const uploadAdmission = createAsyncThunk(
    "uploadAdmission",
    async (file: File, { rejectWithValue }) => {
        const url: string = "http://localhost:5088/api/Admission/upload";
        const formData = new FormData();
        formData.append('file', file);
        try {
            await fetchWrapper.post(url, formData);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const uploadConfirmAdmission = createAsyncThunk(
    "uploadConfirmAdmission",
    async (file: File, { rejectWithValue }) => {
        const url: string = "http://localhost:5088/api/Admission/upload-confirmation";
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData);
        try {
            await fetchWrapper.post(url, formData);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const createAdmission = createAsyncThunk(
    "createAdmission",
    async (admission: ICreateAdmission, { rejectWithValue }) => {
        const url: string = "http://localhost:5088/api/Admission/add";
        try {
            const json = await fetchWrapper.post(url, admission);
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updateAdmission = createAsyncThunk(
    "updateAdmission",
    async (admission: IUpdateAdmission, { rejectWithValue }) => {
        const url: string = `http://localhost:5088/api/Admission/update`;
        try {
            const json = await fetchWrapper.put(url, admission);
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const readAllAdmissions = createAsyncThunk(
    "readAllAdmissions",
    async (args, { rejectWithValue }) => {
        const url: string = "http://localhost:5088/api/Admission/get";
        try {
            const json = await fetchWrapper.get(url)
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteAdmission = createAsyncThunk(
    "deleteAdmission",
    async (id: number | undefined, { rejectWithValue }) => {
        // Nếu hàm deleteAdmission không trả về data 
        // thì createAsyncThunk sẽ expect là action.payload nhận vào từ component có thể undefined
        // => Khai bảo kiểu xử lý trạng thái fullfilled của hàm deleteAdmission là PayloadAction<{ id: number | undefined}>
        const url: string = `http://localhost:5088/api/Admission/delete/${id}`;
        try {
            const json = await fetchWrapper.post(url);
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const confirmAdmission = createAsyncThunk(
    "confirmAdmission",
    async (confirmAdmissions: ConfirmRequest[] | undefined, { rejectWithValue }) => {
        const ids = confirmAdmissions?.map(admission => admission.id);
        const url: string = 'http://localhost:5088/api/Admission/confirm-admission';
        await fetchWrapper.post(url, ids);
        message.success("Xác nhận trúng tuyển thành công");
    }
)

export const unconfirmAdmission = createAsyncThunk(
    "confirmAdmission",
    async (confirmAdmissions: ConfirmRequest[] | undefined, { rejectWithValue }) => {
        const ids = confirmAdmissions?.map(admission => admission.id);
        console.log(ids);
        const url: string = 'http://localhost:5088/api/Admission/unconfirm-admission';
        await fetchWrapper.post(url, ids);
        message.success("Hủy xác nhận trúng tuyển thành công");
    }
)

// employee slice với trạng thái ban đầu và các reducer để thay đổi trạng thái.
// Chúng thực hiện các thao tác CRUD và cũng chuyển đổi employee.
// Redux-Toolkit sử dụng Immutable.js cho phép chúng ta thay đổi trạng thái
// nhưng phía nền tảng mọi thứ hoạt động như trạng thái không thay đổi.
const AdmissionSlice = createSlice({
    name: "AdmissionSlice",
    initialState,
    reducers: {
        searchAdmission: (
            state: AdmissionState,
            action: PayloadAction<string | undefined>
        ): void => {
            state.searchData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAdmission.pending, (state) => {
                state.pending = true;
            })
            // .addCase(createAdmission.fulfilled, (state, action: PayloadAction<IAdmission>) => {
            //     state.pending = false;
            //     state.Admissions.push(action.payload);
            // })
            .addCase(createAdmission.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(readAllAdmissions.pending, (state) => {
                state.pending = true;
            })
            .addCase(readAllAdmissions.fulfilled, (state, action: PayloadAction<IAdmission[]>) => {
                state.pending = false;
                state.admissions = action.payload;
            })
            .addCase(readAllAdmissions.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(deleteAdmission.pending, (state) => {
                state.pending = true;
            })
            // .addCase(deleteAdmission.fulfilled, (state, action: PayloadAction<number | undefined>) => {
            //     state.pending = false;
            //     state.Admissions = state.Admissions.filter(
            //         (af: IAdmission) => af.id !== action.payload.id
            //     );
            // })
            .addCase(deleteAdmission.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(updateAdmission.pending, (state) => {
                state.pending = true;
            })
            .addCase(updateAdmission.fulfilled, (state, action: PayloadAction<IAdmission>) => {
                state.pending = false;
                state.admissions = state.admissions.map((af: IAdmission) =>
                    af.id === action.payload.id ? action.payload : af
                );
            })
            .addCase(updateAdmission.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            });

    },
});

// export reducer
export default AdmissionSlice.reducer;
// Destructing from actions
// export action trong reducer được khai báo trong createSlice()
export const { searchAdmission } = AdmissionSlice.actions;

// synchronous actions (things you don't have to wait for).
// asynchronous actions (things you have to wait for) such as API
