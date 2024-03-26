import { SET_YEAR_DATA_FAILURE, SET_YEAR_DATA_REQUEST, SET_YEAR_DATA_SUCCESS } from "./actionType"

const initialState = {
    yearData: [],
    loading: false,
    error: null
}
const yearReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_YEAR_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SET_YEAR_DATA_SUCCESS:
            return {
                ...state,
                yearData: action.payload.yearData,
                loading: false,
                error: null
            }
        case SET_YEAR_DATA_FAILURE:
            return {
                ...state,
                yearData: [],
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default yearReducer;