import { SET_RELEVANCE_DATA_FAILURE, SET_RELEVANCE_DATA_REQUEST, SET_RELEVANCE_DATA_SUCCESS } from "./actionType";


const initialState = {
    relevanceData: [],
    loading: false,
    error: null,
};

const relevanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RELEVANCE_DATA_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SET_RELEVANCE_DATA_SUCCESS:
            return {
                ...state,
                relevanceData: action.payload.relevanceData,
                loading: false,
                error: null
            };
        case SET_RELEVANCE_DATA_FAILURE:
            return {
                ...state,
                relevanceData: [],
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default relevanceReducer;
