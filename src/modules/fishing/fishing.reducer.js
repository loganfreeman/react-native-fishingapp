import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.fishing, action) {
	switch (action.type) {

		case types.RETRIEVE_FISHING_REPORT_SUCCESS:
			return {
				...state,
				waterbodies: action.waterbodies
			};

		case types.RETRIEVE_WATERBODY_SUCCESS:
			return {
				...state,
				detail: action.detail
			};

		case types.RETRIEVE_WEATHER_SUCCESS:
			return {
				...state,
				weather: action.weather
			};

		case types.RETRIEVE_STOCKING_SUCCESS:
			return {
				...state,
				stocking: action.stocking
			}

		default:
			return state;
	}
}
