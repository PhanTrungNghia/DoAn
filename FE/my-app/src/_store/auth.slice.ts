import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers/fetch-wrapper";

const name = 'auth';
// implementation
// state
const createInitialState = (): UserState => {
    return {
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user') as string) as User | null,
        error: null,
        pending: true,
    }
}

const initialState = createInitialState();

// sync actions
const createReducers = () : UserReducerType => {
    const logout = (state: UserState) => {
        state.user = null;
        localStorage.removeItem('user');
        // navigate('/login');
    }

    return {
        logout
    }
}

const reducers = createReducers();

// async actions
const createExtraActions = () => {
    const baseUrl = `http://localhost:5088/api/Auth/login`;

    const login = () => {
        return createAsyncThunk(
            `${name}/login`,
            async (userLogin: UserLogin) => await fetchWrapper.post(baseUrl, userLogin)
        );
    }

    return {
        login: login()
    }
}


const extraActions = createExtraActions();

const createExtraReducers = (): ExtraReducersType => {
    return (builder: any) => {
        const { pending, fulfilled, rejected } = extraActions.login;

        builder
            .addCase(pending, (state: UserState) => {
                state.pending = true;
                state.error = null;
            })
            .addCase(fulfilled, (state: UserState, action: PayloadAction<User>) => {
                const user = action.payload;
                localStorage.setItem('user', JSON.stringify(user)) // lưu dữ liệu người dùng và jwt trả về từ server vào LocalStorage
                // để giữ cho người dùng đăng nhập giữa các lần làm mới trang
                state.user = user;

                // get return url from location or default to home page
                // const { from } = location.state || { from: { pathname: '/' } };
                // navigate(from);
            })
            .addCase(rejected, (state: UserState, action: any) => {
                state.error = action.error;
            })
    };
}

const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports
export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

