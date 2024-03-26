import { SET_INTENSITY_DATA_FAILURE, SET_INTENSITY_DATA_REQUEST, SET_INTENSITY_DATA_SUCCESS } from "./actionType"

const initialState = {
    filteredData: [],
    intensityCount: [],
    maxCount: 0,
    loading: false,
    error: null
}
const intensityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INTENSITY_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SET_INTENSITY_DATA_SUCCESS:
            return {
                ...state,
                filteredData: action.payload.filteredData,
                intensityCount: action.payload.intensityCount,
                maxCount: action.payload.maxCount,
                loading: false,
                error: null
            }
        case SET_INTENSITY_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
export default intensityReducer;