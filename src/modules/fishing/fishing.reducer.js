import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.fishing, action) {
	switch (action.type) {

		case types.RETRIEVE_FISHING_REPORT_SUCCESS:
			return {
				...state,
				waterbodies: action.waterbodies
			};

		default:
			return state;
	}
}
