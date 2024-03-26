import { SET_COUNTRY_DATA_FAILURE, SET_COUNTRY_DATA_REQUEST, SET_COUNTRY_DATA_SUCCESS } from './ActionType';

const initialState = {
    countryData: [],
    countryDictionary: {},
    countryLoading: false,
    error: null,
};

const countryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUNTRY_DATA_REQUEST:
            return {
                ...state,
                countryLoading: true
            };
        case SET_COUNTRY_DATA_SUCCESS:
            return {
                ...state,
                countryData: action.payload.countryData,
                countryDictionary: action.payload.countryCountDictionary,
                countryLoading: false,
                error: null
            };
        case SET_COUNTRY_DATA_FAILURE:
            return {
                ...state,
                countryData: [],
                countryDictionary: {},
                countryLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default countryReducer;
