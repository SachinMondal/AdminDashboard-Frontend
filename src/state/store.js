import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from 'redux-thunk';

import relevanceReducer from './RelevanceData/reducer';
import intensityReducer from './IntensityState/reducer';
import regionReducer from './RegionState/reducer';
import yearReducer from './YearState/reducer';
import countryReducer from './CountryState/reducer';

const rootReducer = combineReducers({
    country: countryReducer,
    relevance: relevanceReducer,
    intensity: intensityReducer,
    region: regionReducer,
    year: yearReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
