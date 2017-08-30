import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	Text,
	ScrollView,
	Alert,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fishingReportActions from './fishingreport.actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Weather';
import { iconsMap } from '../../utils/AppIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, Button } from 'react-native-elements';


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
    if (nextProps.detail) this.setState({ isLoading: false });
  }


  render() {
    const { water } = this.props;

    return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView style={styles.container}>
				<Card title={water.title}>
					<Text>{water.latitude}</Text>
					<Text>{water.longitude}</Text>
				</Card>
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
