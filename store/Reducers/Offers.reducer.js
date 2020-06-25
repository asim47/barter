import * as Actions from "../Actions"

const initialState = {
    SavedData: null,
    Loading: null,
    MyPoints: null,

    MyPostedOffers: null,
    OffersToOthers: null,
};

export const OfferReducer = (state = initialState, action) => {

    switch (action.type) {
        case Actions.SAVING_AD_SAVE_DATA:
            return {
                ...state,
                SavedData: action.payload
            }
        case Actions.GETTING_MY_POINTS:
            return {
                ...state,
                MyPoints: action.payload
            }

        case Actions.MY_POSTED_OFFER:
            return {
                ...state,
                MyPostedOffers: action.payload
            }
        case Actions.OFFERS_TO_OTHERS:
            return {
                ...state,
                OffersToOthers: action.payload
            }
        default:
            return state;
    }


}