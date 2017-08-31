import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	Text,
	ScrollView,
	Alert,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fishingReportActions from './fishingreport.actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Weather';
import { iconsMap } from '../../utils/AppIcons';

import { toLocaleTimeString } from '../../utils/Util';


import Icon from 'react-native-vector-icons/Ionicons';
import { Card, List, ListItem } from 'react-native-elements';
import CardWeather from './components/CardWeather';


class Weather extends Component {
  constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isRefreshing: false,
			visibleModal: null
		};
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

  componentWillMount() {
		this._retrieveWeather();
  }

	_retrieveWeather() {
		const { water } = this.props;
		this.props.actions.retrieveWeather(water.latitude, water.longitude);
	}

  _onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.dismissModal();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.weather) this.setState({ isLoading: false });
  }


  render() {

		const icons = {
      'partly-cloudy-day': require('../../img/weather-icons/partly-cloudy-day.png'),
      'partly-cloudy-night': require('../../img/weather-icons/partly-cloudy-night.png'),
      'clear-day': require('../../img/weather-icons/clear-day.png'),
      'clear-night': require('../../img/weather-icons/clear-night.png'),
      'rain': require('../../img/weather-icons/rain.png'),
      'snow': require('../../img/weather-icons/snow.png'),
      'sleet': require('../../img/weather-icons/sleet.png'),
      'wind': require('../../img/weather-icons/wind.png'),
      'fog': require('../../img/weather-icons/fog.png'),
      'cloudy': require('../../img/weather-icons/cloudy.png'),
      'hail': require('../../img/weather-icons/hail.png'),
      'thunderstorm': require('../../img/weather-icons/thunderstorm.png'),
      'tornado': require('../../img/weather-icons/tornado.png'),
      'meteor-shower': require('../../img/weather-icons/meteor-shower.png'),
      'default': require('../../img/weather-icons/default.png')
    };

    const { water } = this.props;
		const { currently, hourly, daily, timezone } = this.props.weather;

    return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView style={styles.container}>
				<Card title={water.title}>
					<View style={styles.listItem}>
						<Text>{currently.summary}</Text>
						{
							<Image style={styles.icon} source={ icons[currently.icon] } />
						}
					</View>
					<View style={styles.listItem}>
						<Text>Wind Speed: </Text><Text>{currently.windSpeed}</Text>
					</View>
					<View style={styles.listItem}>
						<Text>Humidity: </Text><Text>{currently.humidity}</Text>
					</View>
					<View style={styles.listItem}>
						<Text>Pressure: </Text><Text>{currently.pressure}</Text>
					</View>
					<View style={styles.listItem}>
						<Text>Ozone: </Text><Text>{currently.ozone}</Text>
					</View>
					<View style={styles.listItem}>
						<Text>Temperature: </Text><Text>{currently.temperature}</Text>
					</View>
					<View style={styles.listItem}>
						<Text>PrecipProbability: </Text><Text>{currently.precipProbability}</Text>
					</View>
				</Card>
				<View style={styles.listHeading}>
					<Text style={styles.listHeadingLeft}>Hourly weather forcast</Text>
				</View>
				<Card>
				{
					hourly.data.map((data, i) => {
						return (
							<View style={styles.listItem} key={i}>
								<Text style={styles.listItemLeft}>{toLocaleTimeString(data.time)}</Text>
								<View style={{flexDirection: 'row'}}>
									<Image style={styles.icon} source={ icons[data.icon] } />
									<Text>{data.temperature}</Text>
								</View>
							</View>
						);
					})
				}
				</Card>
				<View style={styles.listHeading}>
					<Text style={styles.listHeadingLeft}>Daily weather forcast</Text>
				</View>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{daily.data.map((data, i) => (
						<CardWeather data={data} timezone={timezone} key={i} />
					))}
				</ScrollView>
			</ScrollView>

    );
  }

}

let navigatorStyle = {};

if (Platform.OS === 'ios') {
	navigatorStyle = {
		navBarTranslucent: true,
		drawUnderNavBar: true
	};
} else {
	navigatorStyle = {
		navBarBackgroundColor: '#0a0a0a'
	};
}

Weather.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

Weather.propTypes = {
  actions: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	water: PropTypes.object.isRequired,
	weather: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		weather: state.fishing.weather
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(fishingReportActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
