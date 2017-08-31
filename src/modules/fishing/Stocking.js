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
import styles from './styles/Stocking';
import { iconsMap } from '../../utils/AppIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, Button } from 'react-native-elements';
import { range } from 'lodash';
import openMap from 'react-native-open-maps';
import Calendar from 'react-native-calendar';

class Stocking extends Component {
	static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../img/find.png'), // for icon button, provide the local image asset name
        id: 'search' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
			{
        icon: require('../../img/calendar.png'), // for icon button, provide the local image asset name
        id: 'calendar' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

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
    this._retrieveStocking();
  }

  _onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.dismissModal();
      }
			if (event.id == 'search') {

      }
			if (event.id == 'calendar') {

      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stocking) this.setState({ isLoading: false });
  }

  _retrieveStocking(isRefreshed) {
    this.props.actions.retrieveStocking();
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this._retrieveStocking('isRefreshed');
  }

  render() {
    const { stocking } = this.props;

    return (
      this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView style={styles.container}>
        <Card>
				{
					stocking.map((entry, i) => {
						return (
							<View key={i}>
								<View style={styles.listHeading} >
									<Text style={styles.listHeadingLeft}>{entry.watername}</Text>
								</View>
								<View style={styles.listHeading} >
									<Text style={styles.listHeadingLeft}>Stock Date</Text>
									<Text>{entry.stockdate}</Text>
								</View>
								<View style={styles.listHeading} >
									<Text style={styles.listHeadingLeft}>Species</Text>
									<Text>{entry.species}</Text>
								</View>
								<View style={styles.listHeading} >
									<Text style={styles.listHeadingLeft}>quantity</Text>
									<Text>{entry.quantity}</Text>
								</View>
								<View style={styles.listFooter} >
									<Text style={styles.listHeadingLeft}>length</Text>
									<Text>{entry.length}</Text>
								</View>
							</View>
						);
					})
				}
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

Stocking.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

Stocking.propTypes = {
	actions: PropTypes.object.isRequired,
	navigator: PropTypes.object,
	stocking: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
	return {
		stocking: state.fishing.stocking
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(fishingReportActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Stocking);
