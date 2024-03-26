import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { checkAuth, forgotPassword, login, logout, resendOtp,fetchUsers, resetPassword, signup, verifyOtp } from './AuthApi'

const initialState={
    status:"idle",
//     userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null,
//   userDetails: localStorage.getItem('userDetails')
//     ? JSON.parse(localStorage.getItem('userDetails'))
//     : null,
    errors:null,
    signupStatus:"idle",
    signupError:null,
    loginStatus:"idle",
    loginError:null,
    users: [],
    loggedInUser:null,
    otpVerificationStatus:"idle",
    otpVerificationError:null,
    forgotPasswordStatus:"idle",
    forgotPasswordSuccessMessage:null,
    forgotPasswordError:null,
    resetPasswordStatus:"idle",
    resetPasswordSuccessMessage:null,
    resetPasswordError:null,
    successMessage:null,
    isAuthChecked:false,

}

export const signupAsync=createAsyncThunk('auth/signupAsync',async(cred)=>{
    const res=await signup(cred)
    return res
})

export const loginAsync=createAsyncThunk('auth/loginAsync',async(cred)=>{
    const res=await login(cred)
    return res
})

export const verifyOtpAsync=createAsyncThunk('auth/verifyOtpAsync',async(verificationCode)=>{
    const res=await verifyOtp(verificationCode)
    return res
})

export const forgotPasswordAsync=createAsyncThunk('auth/forgotPasswordAsync',async(cred)=>{
    const res=await forgotPassword(cred)
    return res
})

export const resetPasswordAsync=createAsyncThunk('auth/resetPasswordAsync',async(cred)=>{
    const res=await resetPassword(cred)
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
                state.signupStatus='fullfilled'
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
                state.loginStatus='fullfilled'
                state.loggedInUser=action.payload
            })
            .addCase(loginAsync.rejected,(state,action)=>{
                state.loginStatus='rejected'
                state.loginError=action.error
            })

            .addCase(verifyOtpAsync.pending,(state)=>{
                state.otpVerificationStatus='pending'
            })
            .addCase(verifyOtpAsync.fulfilled,(state,action)=>{
                state.otpVerificationStatus='fullfilled'
                state.loggedInUser=action.payload
            })
            .addCase(verifyOtpAsync.rejected,(state,action)=>{
                state.otpVerificationStatus='rejected'
                state.otpVerificationError=action.error
            })

            .addCase(forgotPasswordAsync.pending,(state)=>{
                state.forgotPasswordStatus='pending'
            })
            .addCase(forgotPasswordAsync.fulfilled,(state,action)=>{
                state.forgotPasswordStatus='fullfilled'
                state.forgotPasswordSuccessMessage=action.payload
            })
            .addCase(forgotPasswordAsync.rejected,(state,action)=>{
                state.forgotPasswordStatus='rejected'
                state.forgotPasswordError=action.error
            })

            .addCase(resetPasswordAsync.pending,(state)=>{
                state.resetPasswordStatus='pending'
            })
            .addCase(resetPasswordAsync.fulfilled,(state,action)=>{
                state.resetPasswordStatus='fullfilled'
                state.resetPasswordSuccessMessage=action.payload
            })
            .addCase(resetPasswordAsync.rejected,(state,action)=>{
                state.resetPasswordStatus='rejected'
                state.resetPasswordError=action.error
            })

            .addCase(logoutAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(logoutAsync.fulfilled,(state)=>{
                state.status='fullfilled'
                state.loggedInUser=null
            })
            .addCase(logoutAsync.rejected,(state,action)=>{
                state.status='rejected'
                state.errors=action.error
            })

            .addCase(checkAuthAsync.pending,(state)=>{
                state.status='pending'
            })
            .addCase(checkAuthAsync.fulfilled,(state,action)=>{
                state.status='fullfilled'
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
            state.error = action.error.message;
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
export const selectLoginError=(state)=>state.authSlice.loginError
export const selectOtpVerificationStatus=(state)=>state.authSlice.otpVerificationStatus
export const selectOtpVerificationError=(state)=>state.authSlice.otpVerificationError
export const selectForgotPasswordStatus=(state)=>state.authSlice.forgotPasswordStatus
export const selectForgotPasswordSuccessMessage=(state)=>state.authSlice.forgotPasswordSuccessMessage
export const selectForgotPasswordError=(state)=>state.authSlice.forgotPasswordError
export const selectResetPasswordStatus=(state)=>state.authSlice.resetPasswordStatus
export const selectResetPasswordSuccessMessage=(state)=>state.authSlice.resetPasswordSuccessMessage
export const selectResetPasswordError=(state)=>state.authSlice.resetPasswordError

// exporting reducers
export const {clearAuthSuccessMessage,clearAuthErrors,resetAuthStatus,clearSignupError,resetSignupStatus,clearLoginError,resetLoginStatus,clearOtpVerificationError,resetOtpVerificationStatus,clearForgotPasswordError,clearForgotPasswordSuccessMessage,resetForgotPasswordStatus,clearResetPasswordError,clearResetPasswordSuccessMessage,resetResetPasswordStatus}=authSlice.actions

export default authSlice.reducer
