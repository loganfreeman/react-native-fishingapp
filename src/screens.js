/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Drawer from './modules/_global/Drawer';
import FishingReport from './modules/fishing/FishingReport';
import WaterBody from './modules/fishing/WaterBody';
import Weather from './modules/fishing/Weather';
import Stocking from './modules/fishing/Stocking';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('movieapp.Drawer', () => Drawer);
	Navigation.registerComponent('movieapp.FishingReport', () => FishingReport, store, Provider);
	Navigation.registerComponent('movieapp.WaterBody', () => WaterBody, store, Provider);
	Navigation.registerComponent('movieapp.Weather', () => Weather, store, Provider);
	Navigation.registerComponent('movieapp.Stocking', () => Stocking, store, Provider);
}
