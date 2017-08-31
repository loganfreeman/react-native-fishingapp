import React, { PropTypes } from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Card, ListItem } from 'react-native-elements';


import styles from './styles/CardWeather';
import { TMDB_IMG_URL } from '../../../constants/api';

const icons = {
  'partly-cloudy-day': require('../../../img/weather-icons/partly-cloudy-day.png'),
  'partly-cloudy-night': require('../../../img/weather-icons/partly-cloudy-night.png'),
  'clear-day': require('../../../img/weather-icons/clear-day.png'),
  'clear-night': require('../../../img/weather-icons/clear-night.png'),
  'rain': require('../../../img/weather-icons/rain.png'),
  'snow': require('../../../img/weather-icons/snow.png'),
  'sleet': require('../../../img/weather-icons/sleet.png'),
  'wind': require('../../../img/weather-icons/wind.png'),
  'fog': require('../../../img/weather-icons/fog.png'),
  'cloudy': require('../../../img/weather-icons/cloudy.png'),
  'hail': require('../../../img/weather-icons/hail.png'),
  'thunderstorm': require('../../../img/weather-icons/thunderstorm.png'),
  'tornado': require('../../../img/weather-icons/tornado.png'),
  'meteor-shower': require('../../../img/weather-icons/meteor-shower.png'),
  'default': require('../../../img/weather-icons/default.png')
};

function toLocaleString(utcSeconds) {
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  return d.toDateString();
}

function toLocaleTimeString(utcSeconds) {
  let d = new Date(utcSeconds);
  return d.toLocaleTimeString();
}

const CardWeather = ({ data }) => (
	<Card containerStyle={{padding: 0, width: 200, borderRadius: 3}} title={toLocaleString(data.time)}>
    <Image style={styles.icon} source={ icons[data.icon] } />
    <View style={styles.listItem}>
      <Text style={styles.summary}>{data.summary}</Text>
    </View>

    <View style={styles.listItem}>
      <Text>Subrise time: </Text><Text>{toLocaleTimeString(data.sunriseTime)}</Text>
    </View>
    <View style={styles.listItem}>
      <Text>Sunset time: </Text><Text>{toLocaleTimeString(data.sunsetTime)}</Text>
    </View>
    <View style={styles.listItem}>
      <Text>Wind Speed: </Text><Text>{data.windSpeed}</Text>
    </View>
    <View style={styles.listItem}>
      <Text>Humidity: </Text><Text>{data.humidity}</Text>
    </View>
    <View style={styles.listItem}>
      <Text>Pressure: </Text><Text>{data.pressure}</Text>
    </View>
    <View style={styles.listItem}>
      <Text>Ozone: </Text><Text>{data.ozone}</Text>
    </View>
    <View style={styles.listItem}>
      <Text>Temperature min: </Text><Text>{data.temperatureMin}</Text>
    </View>
    <View style={styles.listItem}>
      <Text>Temperature max: </Text><Text>{data.temperatureMax}</Text>
    </View>
    <View style={styles.listItem}>
      <Text>PrecipProbability: </Text><Text>{data.precipProbability}</Text>
    </View>
	</Card>
);

CardWeather.propTypes = {
	data: PropTypes.object.isRequired
};

export default CardWeather;
