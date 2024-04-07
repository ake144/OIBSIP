import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, login, logout, fetchUsers, signup } from './AuthApi';

const initialState = {
  status: "idle",
  errors: null,
  signupStatus: "idle",
  signupError: null,
  loginStatus: "idle",
  loginError: null,
  logoutStatus: "idle",
  loggedInUser: (() => {
    const loggedInUserString = localStorage.getItem('user');
    try {
      return loggedInUserString ? JSON.parse(loggedInUserString) : null;
    } catch (error) {
      console.error('Error parsing loggedInUser from localStorage:', error);
      return null;
    }
  })(),
  isAuthChecked: false,
};



export const signupAsync = createAsyncThunk('auth/signupAsync', async (cred) => {
  const res = await signup(cred);
  return res;
});


export const loginAsync=createAsyncThunk('auth/loginAsync',async(cred)=>{
    const res=await login(cred)
    return res
})



export const checkAuthAsync=createAsyncThunk('auth/checkAuthAsync',async()=>{
    const res=await checkAuth()
    return res
})

export const logoutAsync=createAsyncThunk("auth/logoutAsync",async()=>{
    const res=await logout()
    return res
})

export const fetchUsersAsync=createAsyncThunk("auth/fetchUsersAsync",async()=>{
    const res = await fetchUsers()
    return res
})

const authSlice=createSlice({
    name:"authSlice",
    initialState:initialState,
        reducers:{
        
        clearAuthSuccessMessage:(state)=>{
            state.successMessage=null
        },
        clearAuthErrors:(state)=>{
            state.errors=null
        },
        resetAuthStatus:(state)=>{
            state.status='idle'
        },
        resetSignupStatus:(state)=>{
            state.signupStatus='idle'
        },
        clearSignupError:(state)=>{
            state.signupError=null
        },
        resetLoginStatus:(state)=>{
            state.loginStatus='idle'
        },
        clearLoginError:(state)=>{
            state.loginError=null
        },
        resetOtpVerificationStatus:(state)=>{
            state.otpVerificationStatus='idle'
        },
        clearOtpVerificationError:(state)=>{
            state.otpVerificationError=null
        },
        resetForgotPasswordStatus:(state)=>{
            state.forgotPasswordStatus='idle'
        },
        clearForgotPasswordSuccessMessage:(state)=>{
            state.forgotPasswordSuccessMessage=null
        },
        clearForgotPasswordError:(state)=>{
            state.forgotPasswordError=null
        },
        resetResetPasswordStatus:(state)=>{
            state.resetPasswordStatus='idle'
        },
        clearResetPasswordSuccessMessage:(state)=>{
            state.resetPasswordSuccessMessage=null
        },
        clearResetPasswordError:(state)=>{
            state.resetPasswordError=null
        },
    },

    extraReducers:(builder)=>{
        builder
            .addCase(signupAsync.pending,(state)=>{
                state.signupStatus='pending'
            })
            .addCase(signupAsync.fulfilled,(state,action)=>{
                state.signupStatus='fulfilled'
                state.loggedInUser=action.payload
            })
            .addCase(signupAsync.rejected,(state,action)=>{
                state.signupStatus='rejected'
                state.signupError=action.error
            })
            .addCase(loginAsync.pending,(state)=>{
                state.loginStatus='pending'
            })
            .addCase(loginAsync.fulfilled,(state,action)=>{
                state.loginStatus='fulfilled'
            })
            .addCase(loginAsync.rejected,(state,action)=>{
                state.loginStatus='rejected'
                state.loginError=action.error
            })

           
            .addCase(logoutAsync.pending,(state)=>{
                state.logoutStatus='pending'
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.logoutStatus = 'fulfilled';
                state.loggedInUser = null
            })
            
            .addCase(logoutAsync.rejected,(state,action)=>{
                state.logoutStatus='rejected'
                state.errors=action.error
            })

            .addCase(checkAuthAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(checkAuthAsync.fulfilled,(state,action)=>{
                state.status='fulfilled'
                state.loggedInUser=action.payload
                state.isAuthChecked=true
            })
            .addCase(checkAuthAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
                state.isAuthChecked=true
            })
            .addCase(fetchUsersAsync.pending, (state) => {
                state.status = 'loading';
              })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
              })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.errors = action.error.message;
            })
    }})

// exporting selectors
export const selectAllUsers=(state)=>state.authSlice.users
export const selectAuthStatus=(state)=>state.authSlice.status
export const selectAuthErrors=(state)=>state.authSlice.errors
export const selectLoggedInUser=(state)=>state.authSlice.loggedInUser
export const selectAuthSuccessMessage=(state)=>state.authSlice.successMessage
export const selectIsAuthChecked=(state)=>state.authSlice.isAuthChecked
export const selectSignupStatus=(state)=>state.authSlice.signupStatus
export const selectSignupError=(state)=>state.authSlice.signupError
export const selectLoginStatus=(state)=>state.authSlice.loginStatus
export const selectLogoutStatus = (state)=>state.authSlice.logoutStatus
export const selectLoginError=(state)=>state.authSlice.loginError

// exporting reducers
export const {clearAuthSuccessMessage,clearSignupError,clearLoginError,clearForgotPasswordSuccessMessage,resetForgotPasswordStatus,clearResetPasswordError,clearResetPasswordSuccessMessage,resetResetPasswordStatus}=authSlice.actions

export default authSlice.reducer
