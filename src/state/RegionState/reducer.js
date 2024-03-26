
import { SET_REGION_DATA_FAILURE, SET_REGION_DATA_REQUEST, SET_REGION_DATA_SUCCESS } from "./actionType"

const initialState = {
    regionData: [],
    sectorData: [],
    topicData: {},
    loading: false,
    error: null
}

const regionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REGION_DATA_REQUEST:
            return {
                ...state, loading: true
            }
        case SET_REGION_DATA_SUCCESS:
            return {
                ...state,
                regionData: action.payload.regionData,
                sectorData: action.payload.sectors,
                topicData: action.payload.topics,
                loading: false,
                error: null
            }
        case SET_REGION_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                regionData: [],
                sectorData: [],
                topicData: {},
                error: action.payload
            }
        default:
            return { ...state };
    }
}

export default regionReducer;