/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import Movies from './modules/movies/Movies';
import TVShow from './modules/movies/TVShow';
import MoviesList from './modules/movies/MoviesList';
import Movie from './modules/movies/Movie';
import Search from './modules/movies/Search';
import FishingReport from './modules/fishing/FishingReport';
import WaterBody from './modules/fishing/WaterBody';
import Weather from './modules/fishing/Weather';
import Stocking from './modules/fishing/Stocking';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('movieapp.Movie', () => Movie, store, Provider);
	Navigation.registerComponent('movieapp.Movies', () => Movies, store, Provider);
	Navigation.registerComponent('movieapp.Shows', () => TVShow, store, Provider);
	Navigation.registerComponent('movieapp.MoviesList', () => MoviesList, store, Provider);
	Navigation.registerComponent('movieapp.Search', () => Search, store, Provider);
	Navigation.registerComponent('movieapp.Drawer', () => Drawer);
	Navigation.registerComponent('movieapp.FishingReport', () => FishingReport, store, Provider);
	Navigation.registerComponent('movieapp.WaterBody', () => WaterBody, store, Provider);
	Navigation.registerComponent('movieapp.Weather', () => Weather, store, Provider);
	Navigation.registerComponent('movieapp.Stocking', () => Stocking, store, Provider);
}
