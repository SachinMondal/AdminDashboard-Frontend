import { api } from "../../apiConfig/apiConfig";
import { SET_INTENSITY_DATA_FAILURE, SET_INTENSITY_DATA_REQUEST, SET_INTENSITY_DATA_SUCCESS } from "./actionType";

export const fetchIntensityData = () => async (dispatch) => {
    try {
        dispatch({ type: SET_INTENSITY_DATA_REQUEST });
        const data = await api({
            url: "/filterData?intensity=",
            method: 'GET'
        });

        const filteredData = data.data.filter(item => item.intesity !== null);

        const intensityCount = filteredData.reduce((acc, curr) => {
            const intensity = curr.intensity;
            acc[intensity] = (acc[intensity] || 0) + 1;
            return acc;
        }, {});
        const counts = Object.values(intensityCount);
        const max = Math.max(...counts);


        dispatch({
            type: SET_INTENSITY_DATA_SUCCESS,
            payload: {
                filteredData: filteredData,
                intensityCount: intensityCount,
                maxCount: max
            }
        });
    } catch (error) {

        dispatch({ type: SET_INTENSITY_DATA_FAILURE, payload: error.message });
    }
};



