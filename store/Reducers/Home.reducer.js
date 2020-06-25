import * as Actions from "../Actions"

const initialState = {
    loadingCategories: true,
    CategoriesArray: [],
    TotalPage: 1,

    OffersArray: [],
    SelectedOffer: null,
    Notifications: null,


    CategoryListing: null,
    selectedCategoryID: null,
    keyword: "",
    condition: "",
    distance: 0,
    coordinates: "",
    sortBy: -1, 
    CategoryListingSearch: [],
    selectedCategoryIDSearch: null,
    keywordSearch: "",
    conditionSearch: "",
    distanceSearch: 0,
    coordinatesSearch: "",
    sortBySearch: -1

};

export const HomeReducer = (state = initialState, action) => {

    switch (action.type) {
        case Actions.GETTING_HOME_CATEGORIES_LIST_PAGGED:
            return {
                ...state,
                CategoriesArray: action.payload,
                TotalPage: action.totalPage
            }

        case Actions.CATEGORIES_LOADING_HOME:
            return {
                ...state,
                loadingCategories: action.payload
            }

        case Actions.GETTING_OFFERS:
            return {
                ...state,
                OffersArray: action.payload
            }
        case Actions.SELECTING_OFFER:
            return {
                ...state,
                SelectedOffer: action.payload
            }
        case Actions.SETTING_CATEGORY_LISTING_FIELDS:
            return {
                ...state,
                [action.field]: action.data
            }
        case Actions.GETTING_NOTIFICATION:
            return {
                ...state,
                Notifications: action.payload
            }
        default:
            return state;
    }

}



// return {
//     ...state,
//     // CategoriesArray: [
//     //     ...state.CategoriesArray,
//     //     ...action.payload,
//     // ],
// }