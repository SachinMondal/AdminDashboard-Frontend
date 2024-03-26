import { api } from "../../apiConfig/apiConfig";
import { SET_COUNTRY_DATA_FAILURE, SET_COUNTRY_DATA_REQUEST, SET_COUNTRY_DATA_SUCCESS } from "./ActionType";

export const fetchCountryData = () => async (dispatch) => {
    try {
        dispatch({ type: SET_COUNTRY_DATA_REQUEST });
        const data = await api({
            url: `/filterData?country=`,
            method: 'GET'
        });


        const uniqueCountries = new Set();
        const filteredData = data.data.filter(item => {
            if (item.country !== "" && !uniqueCountries.has(item.country)) {
                uniqueCountries.add(item.country);
                return true;
            }
            return false;
        });

        const countryCountDictionary = {};
        data.data.forEach(item => {
            if (item.country !== "") {
                if (!countryCountDictionary[item.country]) {
                    countryCountDictionary[item.country] = 1;
                } else {
                    countryCountDictionary[item.country]++;
                }
            }

        });

        dispatch({
            type: SET_COUNTRY_DATA_SUCCESS,
            payload: {
                countryData: filteredData,
                countryCountDictionary: countryCountDictionary
            }
        });
    } catch (error) {
        dispatch({ type: SET_COUNTRY_DATA_FAILURE, payload: error.message });
    }
};

