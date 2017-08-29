import * as types from '../../constants/actionTypes';
import { FISHING_REPORT_URL } from '../../constants/api';
import extractFishingReport from './helper';
import axios from 'axios';


// GENRES
export function retrieveFishingReportsSuccess(waterbodies) {
	return {
		type: types.RETRIEVE_FISHING_REPORT_SUCCESS,
		waterbodies: waterbodies
	};
}

export function retrieveFishingReports() {
	return function (dispatch) {
		return axios.get(FISHING_REPORT_URL)
		.then(res => {
			let action = retrieveFishingReportsSuccess(extractFishingReport(res.data));
			dispatch(action);
		})
		.catch(error => {
			console.log(error); //eslint-disable-line
		});
	};
}
