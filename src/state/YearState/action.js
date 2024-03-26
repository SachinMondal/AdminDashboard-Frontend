import { api } from "../../apiConfig/apiConfig";
import { SET_YEAR_DATA_FAILURE, SET_YEAR_DATA_REQUEST, SET_YEAR_DATA_SUCCESS } from "./actionType";

export const fetchingYearData = (params) => async (dispatch) => {
    try {
        dispatch({ type: SET_YEAR_DATA_REQUEST });
        const response = await api({
            url: `/filterData?startYear=${params.selectedYear}`,
            method: 'GET',
            params: params
        });
        const data = await response;
        const filteredData = data.data.filter(item => item.start_year !== null);

        const startYearCounts = {};
        filteredData.forEach(item => {
            const startYear = item.start_year;
            if (startYear !== null && startYear !== '') {
                startYearCounts[startYear] = startYearCounts[startYear] ? startYearCounts[startYear] + 1 : 1;
            }
        });
        dispatch({
            type: SET_YEAR_DATA_SUCCESS,
            payload: {
                yearData: startYearCounts
            }
        });
    } catch (error) {

        dispatch({ type: SET_YEAR_DATA_FAILURE, payload: error.message });
    }
}