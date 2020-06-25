import axios from "axios"
import { API_ENDPOINT, Headers } from "../../Global-Variables"
import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios";
import * as Actions from "./index"
export const SAVING_AD_SAVE_DATA = "SAVING_AD_SAVE_DATA";
export const GETTING_MY_POINTS = "SAVING_AD_SAVE_DATA";
export const MY_POSTED_OFFER = "SAVING_AD_SAVE_DATA";
export const OFFERS_TO_OTHERS = "SAVING_AD_SAVE_DATA";

export const SaveImages = (id, imageData) => async (dispatch, getState) => {
    try {
        if (!imageData) return false

        let res = await Axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/SaveOfferImage", {
            imageContent: imageData,
            imageExtension: "png",
            offerID: id
        }, Headers);
        return true
    } catch (error) {
        console.log(error)
    }
}

export const SaveAnAd = (data) => async (dispatch, getState) => {
    const SavedData = getState().offer.SavedData;
    const UserData = getState().auth.userData;

    const body = {
        "offerID": "0",
        "nTitle": SavedData.Title,
        "nDesc": data.Description,
        "nContent": "",
        "nCategory": SavedData.Category,
        "nSubCategory": SavedData.SubCategory,
        "nNewSubCategory": SavedData.SubCategory,
        "nCondition": SavedData.Condition,
        "nLoyatlityRange": data.Points,
        "nCountry": "3",
        "nCity": "2",
        "nLat": data.Lat,
        "nLot": data.Long,
        "nCreatedBy": UserData.UserName,
        "nLanguageID": I18nManager.isRTL ? "2" : "1",
        "nWebsiteID": "1",
        "nIsPoints": "0",
        "nAttachment": "",
        "nNewCat": "",
        "nAddress": data.Location,
        "requiredPoints": "0"
    }
    try {
        let res = await Axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/PostAd", body, Headers);

        if (res.data.PostAdResult.result) {
            await Promise.all([
                dispatch(SaveImages(res.data.PostAdResult.nModuleID, SavedData.Image1)),
                dispatch(SaveImages(res.data.PostAdResult.nModuleID, SavedData.Image2)),
                dispatch(SaveImages(res.data.PostAdResult.nModuleID, SavedData.Image3))
            ]).then(() => {
                return true
            })
        }

    } catch (error) {
        console.log(error);

    }

}


export const GettingMyOffers = () => async (dispatch, getState) => {
    try {
        let res = await Axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/LoadPoints", {
            nCurrentId: getState().auth.userData.ID
        }, Headers);
        dispatch({
            type: GETTING_MY_POINTS,
            payload: res.data.LoadPointsResult.UserPoints
        })

    } catch (error) {
        console.log(error)
    }
}



export const GettingMyPostedOffers = () => async (dispatch, getState) => {


    try {
        let res = await Axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/GetItemsByUser", {
            "_language": I18nManager.isRTL ? 2 : 1,
            "_website": 1,
            "nUserID": getState().auth.userData.ID,
        }, Headers);



        if (res.data.GetItemsByUserResult.result) {
            dispatch({
                type: MY_POSTED_OFFER,
                payload: res.data.GetItemsByUserResult.BarterAray,
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const GettingMyOffersForOthers = () => async (dispatch, getState) => {
    try {
        let res = await Axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/LoadCounterOffers", {
            "LanguageID": I18nManager.isRTL ? 2 : 1,
            "nWebsiteID": 1,
            "nCurrentUserId": getState().auth.userData.ID,
        }, Headers);



        if (res.data.LoadCounterOffersResult.result) {
            dispatch({
                type: OFFERS_TO_OTHERS,
                payload: res.data.LoadCounterOffersResult.offerData,
            })
        }
    } catch (error) {
        console.log(error)
    }
}


export const GettingOfferByID = (ID) => async (dispatch, getState) => {
    dispatch({
        type: Actions.SELECTING_OFFER,
        payload: null,
    })

    try {
        let res = await Axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/GetBarterByID", {
            "_language": I18nManager.isRTL ? 2 : 1,
            "_website": 1,
            "nID": ID,
        }, Headers);



        if (res.data.GetBarterByIDResult.result) {
            dispatch({
                type: Actions.SELECTING_OFFER,
                payload: res.data.GetBarterByIDResult.BarterAray[0],
            })
        }
    } catch (error) {
        console.log(error)
    }
}