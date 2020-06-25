import { combineReducers } from 'redux';
import { HomeReducer } from './Home.reducer';
import { OfferReducer } from './Offers.reducer';

export const Reducer = combineReducers({
    home : HomeReducer,
    offer : OfferReducer,
});

