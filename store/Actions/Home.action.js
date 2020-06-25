import axios from "axios"
import { API_ENDPOINT, Headers } from "../../Global-Variables"
import AsyncStorage from '@react-native-community/async-storage';
import Axios from "axios";
import { I18nManager } from "react-native";


export const GETTING_HOME_CATEGORIES_LIST_PAGGED = "SAVING_AD_SAVE_DATA"
export const CATEGORIES_LOADING_HOME = "SAVING_AD_SAVE_DATA"
export const GETTING_OFFERS = "SAVING_AD_SAVE_DATA"
export const SELECTING_OFFER = "SAVING_AD_SAVE_DATA"
export const SETTING_CATEGORY_LISTING_FIELDS = "SAVING_AD_SAVE_DATA"
export const GETTING_NOTIFICATION = "SAVING_AD_SAVE_DATA"


export const settingCategoryDatas = (field, data) => async dispatch => {
    dispatch({
        type: SETTING_CATEGORY_LISTING_FIELDS,
        field,
        data
    })

}

export const GettingChildrenCategories = () => async (dispatch, getState) => {
    try {
        dispatch(settingCategoryDatas("CategoryListing", null))
        let res = await axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/GetProductListing", {
            languageID: I18nManager.isRTL ? 2 : 1,
            categories: getState().home.selectedCategoryID,
            condition: getState().home.condition,
            coordinates: getState().home.coordinates,
            distance: getState().home.distance,
            keyword: getState().home.keyword,
            pageKey: 1,
            pageSize: 50,
            websiteID: 1,
            nSortBy: getState().home.sortBy,
        }, Headers);

        if (res.data.GetProductListingResult.result) {
            dispatch(settingCategoryDatas("CategoryListing", res.data.GetProductListingResult.BarterAray))
        }
    } catch (error) {
        console.log(error.response, "THIS ERROR")
    }
}


export const GettingChildrenCategoriesSearch = () => async (dispatch, getState) => {
    try {
        dispatch(settingCategoryDatas("CategoryListingSearch", null))
        let res = await axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/GetProductListing", {
            languageID: I18nManager.isRTL ? 2 : 1,
            categories: getState().home.selectedCategoryIDSearch,
            condition: getState().home.conditionSearch,
            coordinates: getState().home.coordinatesSearch,
            distance: getState().home.distanceSearch,
            keyword: getState().home.keywordSearch,
            pageKey: 1,
            pageSize: 50,
            websiteID: 1,
            nSortBy: getState().home.sortBySearch,

        }, Headers);


        if (res.data.GetProductListingResult.result) {

            dispatch(settingCategoryDatas("CategoryListingSearch", res.data.GetProductListingResult.BarterAray))
        }
    } catch (error) {
        console.log(error.response, "THIS ERROR")
    }
}


export const CategoryHomeLoadingAction = (bool) => async (dispatch, getState) => {
    dispatch({
        type: CATEGORIES_LOADING_HOME,
        payload: bool
    })
}


export const getParentCategoriesPagged = (page = 1) => async (dispatch, getState) => {
    dispatch({
        type: GETTING_HOME_CATEGORIES_LIST_PAGGED,
        payload: [],
        totalPage: 1
    })
    dispatch(CategoryHomeLoadingAction(true))
    try {

        let res = await axios.post(API_ENDPOINT + "/Plugins/Categories/Categories.svc/GetParentCategories", {
            nLanguageID: I18nManager.isRTL ? "2" : "1",
            "nWebsiteID": "1",
            "nModuleType": "BarterDAL.Model.Barter",
            "pageKey": page,
            "pageSize": 100
        }, Headers);


        if (res.data.GetParentCategoriesResult.result) {
            dispatch({
                type: GETTING_HOME_CATEGORIES_LIST_PAGGED,
                payload: res.data.GetParentCategoriesResult.CategoryData,
                totalPage: res.data.GetParentCategoriesResult.TotalPages
            })
        }

        dispatch(CategoryHomeLoadingAction(false))
    } catch (error) {
        console.log(error)
        dispatch(CategoryHomeLoadingAction(false))
    }
    dispatch(CategoryHomeLoadingAction(false))
}


export const GettingOffersHome = (page = 1) => async (dispatch, getState) => {

    try {

        let res = await axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/GetLatestList", {
            _language: I18nManager.isRTL ? "2" : "1",
            nCount: 100,
            _website: 1,
        }, Headers);


        if (res.data.GetLatestListResult.result) {
            dispatch({
                type: GETTING_OFFERS,
                payload: res.data.GetLatestListResult.BarterAray
            })
        }
    } catch (error) {
        console.log(error)
    }

}


export const gettingNotification = (id) => async (dispatch, getState) => {

    try {

        let res = await axios.post(API_ENDPOINT + "/Plugins/HomePage/HomePageDataService.svc/GetWebNotifications", {
            nUserID :id,
        }, Headers);

        
        if(res.data.GetWebNotificationsResult.result){
            dispatch({
                type:GETTING_NOTIFICATION,
                payload:res.data.GetWebNotificationsResult.WebNotificationAray,
            })
        }
    } catch (error) {
        console.log(error)
    }
}