import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isLogin: false,
    isFond: false,
    userInfo: {}
}

export const loginToAccount = createAsyncThunk(
    "loginToAccount",
    async (userInfo, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/users', {
                params: {
                    nickName: userInfo.nickName,
                    password: userInfo.password
                }
            });

            if (response.data.length > 0 && response.data[0].nickName === userInfo.nickName && response.data[0].password === userInfo.password) {
                return response.data[0]; // Kullanıcı bilgilerini döndür
            }

            else {
                return rejectWithValue('Kullanıcı adı veya şifre yanlış');
            }
        } catch (error) {
            return rejectWithValue('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
);

export const newAccount = createAsyncThunk(
    "newAccount",
    async (userInfo, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/users', userInfo);
            return response.data;
        } catch (error) {
            return rejectWithValue('Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear()
            state.isLogin = false
            state.userInfo = {}
            state.isFond = false
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(newAccount.fulfilled, (state, action) => {
        //     state.userInfo = action.payload;
        //     state.isLogin = true;
        // });
        builder.addCase(loginToAccount.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.isLogin = true;
            state.isFond = false;

        });
        builder.addCase(loginToAccount.rejected, (state, action) => {
            state.isFond = true;
            state.isLogin = false;
        });
    }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
