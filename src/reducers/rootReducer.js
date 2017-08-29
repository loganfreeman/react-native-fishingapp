import { combineReducers } from 'redux';
import movies from '../modules/movies/movies.reducer';
import fishing from '../modules/fishing/fishing.reducer';

const rootReducer = combineReducers({
	movies,
	fishing
});

export default rootReducer;
