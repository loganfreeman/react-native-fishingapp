import * as types from '../../constants/actionTypes';
import { FISHING_REPORT_URL, darkSkyAPIURL, darkSkyAPIKey, STOCKING_URL } from '../../constants/api';
import { extractFishingReport, extractWaterbody, extractStocking } from './helper';
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


export function retrieveWaterbodySuccess(detail) {
	return {
		type: types.RETRIEVE_WATERBODY_SUCCESS,
		detail: detail
	};
}

export function retrieveWaterbody(url) {
	return function (dispatch) {
		return axios.get(url)
		.then(res => {
			let action = retrieveWaterbodySuccess(extractWaterbody(res.data));
			dispatch(action);
		})
		.catch(error => {
			console.log(error); //eslint-disable-line
		});
	};
}

export function retrieveWeatherSuccess(weather) {
	return {
		type: types.RETRIEVE_WEATHER_SUCCESS,
		weather
	};
}

export function retrieveWeather(latitude, longitude) {
	let url = `${darkSkyAPIURL}/${darkSkyAPIKey}/${latitude},${longitude}`;
	return function (dispatch) {
		return axios.get(url)
		.then(res => {
			let action = retrieveWeatherSuccess(res.data);
			dispatch(action);
		})
		.catch(error => {
			console.log(error); //eslint-disable-line
		});
	};
}


export function retrieveStockingSuccess(stocking) {
	return {
		type: types.RETRIEVE_STOCKING_SUCCESS,
		stocking: stocking
	};
}

export function retrieveStocking() {
	return function (dispatch) {
		return axios.get(STOCKING_URL)
		.then(res => {
			let action = retrieveStockingSuccess(extractStocking(res.data));
			dispatch(action);
		})
		.catch(error => {
			console.log(error); //eslint-disable-line
		});
	};
}
