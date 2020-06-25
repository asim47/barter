import * as Actions from "../Actions"

const initialState = {
    isAuth: false,
    userData: null,
    errorMsg: null,
    loading: false,
    forgetModalError: null,
    signUpErrorMsg: null,
    VerifyError: null,
    ResetError: null
};

export const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case Actions.LOGIN_FAIL:
            return {
                ...state,
                isAuth: false,
                userData: null,
                errorMsg: action.payload
            }
        case Actions.LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                userData: action.payload,
                errorMsg: null,
            }
        case Actions.LOGIN_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case Actions.FORGOT_ERROR:
            return {
                ...state,
                forgetModalError: action.payload
            }
        case Actions.SIGN_UP_ERROR:

            return {
                ...state,
                signUpErrorMsg: action.payload
            }
        case Actions.VERIFY_CODE_ERROR:
            return {
                ...state,
                VerifyError: action.payload
            }
        default:
            return state;
    }


}