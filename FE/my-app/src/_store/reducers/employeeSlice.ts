import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

// initial employees state
const initialState: EmployeeState = {
    employees: [
        {
            name: "Nguyen Van A",
            age: "31",
            isActive: 0

        },
        {
            name: "Nguyen Van B",
            age: "21",
            isActive: 1

        },
    ],
    pending: true,
}

export const createEmployee = createAsyncThunk(
    "createEmployee",
    async (employee: IEmployee, { rejectWithValue }) => {
        const url: string = "http://localhost:5088/Employee/add";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee),
        };
        const resp = await fetch(url, requestOptions);
        try {
            const json = await resp.json();
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updateEmployee = createAsyncThunk(
    "updateEmployee",
    async (employee: IEmployee, { rejectWithValue }) => {
        const url: string = `http://localhost:5088/Employee/add/${employee.idEmployee}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee),
        };
        const resp = await fetch(url, requestOptions);
        try {
            const json = await resp.json();
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const readAllEmployees = createAsyncThunk(
    "readAllEmployees",
    async (args, { rejectWithValue }) => {
        const url: string = "http://localhost:5088/Employee/get";
        const resp = await fetch(url);
        try {
            const json = await resp.json();
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    "deleteEmployee",
    async (id: number | undefined, { rejectWithValue }) => {
        const url: string = `http://localhost:5088/Employee/delete/${id}`;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const resp = await fetch(url, requestOptions);
        try {
            const json = await resp.json();
            return json;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

// employee slice với trạng thái ban đầu và các reducer để thay đổi trạng thái.
// Chúng thực hiện các thao tác CRUD và cũng chuyển đổi employee.
// Redux-Toolkit sử dụng Immutable.js cho phép chúng ta thay đổi trạng thái
// nhưng phía nền tảng mọi thứ hoạt động như trạng thái không thay đổi.
const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers: {
        searchEmployee: (
            state: EmployeeState,
            action: PayloadAction<string | undefined>
        ): void => {
            state.searchData = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEmployee.pending, (state) => {
                state.pending = true;
            })
            .addCase(createEmployee.fulfilled, (state, action: PayloadAction<IEmployee>) => {
                state.pending = false;
                state.employees.push(action.payload);
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(readAllEmployees.pending, (state) => {
                state.pending = true;
            })
            .addCase(readAllEmployees.fulfilled, (state, action: PayloadAction<IEmployee[]>) => {
                state.pending = false;
                state.employees = action.payload;
            })
            .addCase(readAllEmployees.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.pending = true;
            })
            .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<{ idEmployee: number }>) => {
                state.pending = false;
                state.employees = state.employees.filter(
                    (e: IEmployee) => e.idEmployee !== action.payload.idEmployee
                );
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            })
            .addCase(updateEmployee.pending, (state) => {
                state.pending = true;
            })
            .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<IEmployee>) => {
                state.pending = false;
                state.employees = state.employees.map((e: IEmployee) =>
                    e.idEmployee === action.payload.idEmployee ? action.payload : e
                );
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error as Error;
            });

    },
});

export default employeeSlice.reducer; // ?
// Destructing from actions
export const { searchEmployee } = employeeSlice.actions;
