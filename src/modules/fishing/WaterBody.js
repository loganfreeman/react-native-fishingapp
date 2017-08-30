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
import styles from './styles/WaterBody';
import { iconsMap } from '../../utils/AppIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, List, ListItem, Button, CheckBox, SearchBar } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';
import { RadioButtons } from 'react-native-radio-buttons'
import { range } from 'lodash';


class WaterBody extends Component {
  constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isRefreshing: false,
			visibleModal: null
		};
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

  componentWillMount() {
    this._retrieveDetails();
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

  _retrieveDetails(isRefreshed) {
    this.props.actions.retrieveWaterbody(this.props.water.link);
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this._retrieveDetails('isRefreshed');
  }

  render() {
    const { detail, water } = this.props;

    return (
      this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView style={styles.container}>
				<Card title={water.title}>
						<Text>{detail.summary}</Text>
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

WaterBody.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

WaterBody.propTypes = {
	actions: PropTypes.object.isRequired,
	detail: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	water: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
	return {
		detail: state.fishing.detail
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(fishingReportActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WaterBody);
