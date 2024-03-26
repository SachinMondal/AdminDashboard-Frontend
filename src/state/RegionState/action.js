import { api } from "../../apiConfig/apiConfig";
import { SET_REGION_DATA_REQUEST, SET_REGION_DATA_SUCCESS, SET_REGION_DATA_FAILURE } from "./actionType";

export const fetchRegionData = (params) => async (dispatch) => {
    try {
        dispatch({ type: SET_REGION_DATA_REQUEST });

        const response = await api({
            url: `/filterData?sector=${params.selectedSector}`,
            method: 'GET',
            params: params
        });
        const data = await response;

        // Filtering out null region or sector values
        const filterData = data.data.filter(item => item.region !== "" && item.sector !== "");

        const uniqueSectors = [...new Set(filterData.map(item => item.sector))].filter(sector => sector !== "");

        const topics = {};
        uniqueSectors.forEach(sector => {
            // Filtering out null topics for each sector
            const topicsForSector = [...new Set(filterData.filter(item => item.sector === sector && item.topic !== null && item.topic !== "").map(item => item.topic))];
            topics[sector] = topicsForSector;
        });

        dispatch({
            type: SET_REGION_DATA_SUCCESS,
            payload: {
                regionData: filterData,
                sectors: uniqueSectors,
                topics: topics
            }
        });
    } catch (error) {

        dispatch({ type: SET_REGION_DATA_FAILURE, payload: error.message });
    }
};
