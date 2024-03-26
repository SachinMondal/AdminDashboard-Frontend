
import { api } from "../../apiConfig/apiConfig";
import { SET_RELEVANCE_DATA_FAILURE, SET_RELEVANCE_DATA_REQUEST, SET_RELEVANCE_DATA_SUCCESS } from "./actionType";

export const fetchRelevanceData = () => async dispatch => {
    try {
        dispatch({ type: SET_RELEVANCE_DATA_REQUEST });
        const data = await api({
            url: "/filterData?rel=",
            method: 'GET'
        });
        dispatch({
            type: SET_RELEVANCE_DATA_SUCCESS,
            payload: {
                relevanceData: data.data
            }
        });

    } catch (error) {

        dispatch({ type: SET_RELEVANCE_DATA_FAILURE, payload: error.message });
    }
}