import axios from "axios"
import { API_ENDPOINT, Headers } from "../../Global-Variables"
import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios";
import * as Actions from "./index"
export const LOGIN_SUCCESS = "SAVING_AD_SAVE_DATA"
export const LOGIN_FAIL = "SAVING_AD_SAVE_DATA"
export const LOGIN_LOADING = "SAVING_AD_SAVE_DATA"
export const FORGOT_ERROR = "SAVING_AD_SAVE_DATA"
export const SIGN_UP_ERROR = "SAVING_AD_SAVE_DATA"
export const VERIFY_CODE_ERROR = "SAVING_AD_SAVE_DATA"

export const LoginLoadingAction = (bool) => async (dispatch, getState) => {
    dispatch({
        type: LOGIN_LOADING,
        payload: bool
    })
}
export const LoginAttempt = (data, navigate, setModalOpen, setVerifyMOpen, setEmailToRemember,) => async (dispatch, getState) => {
    dispatch({
        type: LOGIN_FAIL,
        payload: null
    })
    try {
        dispatch(LoginLoadingAction(true))

        let res = await axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/GetAuthenticte", {
            _password: data.password,
            _userName: data.username
        }, Headers);

        if (!res.data.GetAuthenticteResult.result) {
            if (res.data.GetAuthenticteResult.message == "Not Verified") {
                dispatch(LoginLoadingAction(false))
                return true

            }
            dispatch({
                type: LOGIN_FAIL,
                payload: res.data.GetAuthenticteResult.message
            })
        }
        if (res.data.GetAuthenticteResult.result) {
            dispatch(Actions.gettingNotification(res.data.GetAuthenticteResult.BarterUserData[0].ID))
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.GetAuthenticteResult.BarterUserData[0]
            })
            AsyncStorage.setItem('@keepLoginID', res.data.GetAuthenticteResult.BarterUserData[0].ID.toString()).then(() => {
            }).catch(() => {
            })

            setModalOpen(false)
            navigate("Home")
        }

        dispatch(LoginLoadingAction(false))
    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGIN_FAIL,
            payload: "Something Broke Internaly"
        })

        dispatch(LoginLoadingAction(false))
    }
}


export const Logout = () => async (dispatch, getState) => {

    dispatch({
        type: LOGIN_FAIL,
        payload: null
    })

    await AsyncStorage.removeItem("@keepLoginID")

}


export const KeepLogin = () => async (dispatch, getState) => {

    try {
        let value = await AsyncStorage.getItem('@keepLoginID');
        let res = await axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/GetByID", {
            "nID": value
        }, Headers);
        dispatch(Actions.gettingNotification(value))
        if (res.data.GetByIDResult.result) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.GetByIDResult.BarterUserData[0]
            })
        }


    } catch (error) {
        console.log("error")
    }

}

export const ForgotPassword = (e) => async (dispatch, getState) => {
    dispatch(LoginLoadingAction(true))
    dispatch({
        type: FORGOT_ERROR,
        payload: null
    })
    try {
        let res = await axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/ForGetPassword", {
            "nUserName": e
        }, Headers);
        if (!res.data.ForGetPasswordResult.result) {
            dispatch({
                type: FORGOT_ERROR,
                payload: res.data.ForGetPasswordResult.message
            })
        }
        if (res.data.ForGetPasswordResult.result) {
            dispatch({
                type: FORGOT_ERROR,
                payload: res.data.ForGetPasswordResult.message
            })
        }


        dispatch(LoginLoadingAction(false))
    } catch (error) {
        console.log(error)
        dispatch({
            type: FORGOT_ERROR,
            payload: "Something Broke, Try Again Later"
        })
        dispatch(LoginLoadingAction(false))
    }
}


export const RegisterUser = (body, isEdit) => async (dispatch, getState) => {
    dispatch({
        type: SIGN_UP_ERROR,
        payload: null
    })
    dispatch(LoginLoadingAction(true))
    try {
        let res = await axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/Registration", body, Headers);



        if (!res.data.RegistrationResult.result) {
            dispatch({
                type: SIGN_UP_ERROR,
                payload: res.data.RegistrationResult.message
            })
            dispatch(LoginLoadingAction(false))
            return false
        }
        if (res.data.RegistrationResult.result) {
            dispatch(LoginLoadingAction(false))
            if (isEdit) {
                return dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data.RegistrationResult.BarterUserData[0]
                })
            }
            return true
        }
        dispatch(LoginLoadingAction(false))

    } catch (error) {
        console.log(error.response)
        dispatch(LoginLoadingAction(false))

    }
    dispatch(LoginLoadingAction(false))



}

export const GenerateNewCode = (body) => async (dispatch, getState) => {
    try {
        let res = await axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/ReGenerateVerficationCode", {
            nEmail: body,
        }, Headers);
    } catch (error) {
        console.log(error)
    }

}


export const VerifyAccountCodeSubmit = (body) => async (dispatch, getState) => {
    dispatch({
        type: VERIFY_CODE_ERROR,
        payload: null
    })
    dispatch(LoginLoadingAction(true))
    try {
        let res = await axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/ValidateUserCode", body, Headers);


        if (!res.data.ValidateUserCodeResult.result) {
            dispatch({
                type: VERIFY_CODE_ERROR,
                payload: res.data.ValidateUserCodeResult.message
            })
        }

        if (res.data.ValidateUserCodeResult.result) {
            dispatch(LoginLoadingAction(false))
            return true
        }
        dispatch(LoginLoadingAction(false))
    } catch (error) {
        console.log(error)
        dispatch(LoginLoadingAction(false))

    }
    dispatch(LoginLoadingAction(false))
}




export const GetUserDataByID = (body) => async (dispatch, getState) => {

    try {
        const userID = getState().auth.userData.ID;


        let res = await axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/GetByID", {
            "nID": userID
        }, Headers);

        if (res.data.GetByIDResult.result) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.GetByIDResult.BarterUserData[0]
            })
        }
    } catch (error) {
        console.log(error)
    }
}



export const ResetPassword = (body) => async (dispatch, getState) => {
    try {
        let res = await axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/UpdatePassword", body, Headers);


        if(!res.data.UpdatePasswordResult.result){
            return res.data.UpdatePasswordResult.message
        }
    } catch (error) {
        console.log(error)
    }

}