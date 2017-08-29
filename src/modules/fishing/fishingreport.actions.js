import * as types from '../../constants/actionTypes';
import { FISHING_REPORT_URL } from '../../constants/api';
import extractFishingReport from './helper';

// GENRES
export function retrieveFishingReportsSuccess(res) {
	return {
		type: types.RETRIEVE_FISHING_REPORT_SUCCESS,
		waterbodies: waterbodies
	};
}

export function retrieveFishingReports() {
	return function (dispatch) {
		return axios.get(FISHING_REPORT_URL)
		.then(res => {
			dispatch(retrieveFishingReportsSuccess(extractFishingReport(res.data)));
		})
		.catch(error => {
			console.log(error); //eslint-disable-line
		});
	};
}
