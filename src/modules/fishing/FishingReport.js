import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	Text,
	ScrollView,
	Alert,
	TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fishingReportActions from './fishingreport.actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/FishingReport';
import { iconsMap } from '../../utils/AppIcons';
import { Card, List, ListItem, Button, CheckBox } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

class FishingReport extends Component {

	static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../img/find.png'), // for icon button, provide the local image asset name
        id: 'search' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
			{
				icon: require('../../img/filter.png'), // for icon button, provide the local image asset name
				id: 'status' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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
		this._retrieveFishingReport();
	}

	_renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => {
		return (
			<View style={styles.modalContent}>
				<List containerStyle={{marginBottom: 20}}>
				  {
				    list.map((l, i) => (
				      <ListItem
				        roundAvatar
				        avatar={{uri:l.avatar_url}}
				        key={i}
				        title={l.name}
				      />
				    ))
				  }
				</List>
				{this._renderButton('Close', () => this.setState({ visibleModal: null }))}
			</View>
		);
	}

	_retrieveFishingReport() {
		this.props.actions.retrieveFishingReports()
			.then(() => {
				let state = {
					waterbodies: this.props.waterbodies,
					isLoading: false,
					isRefreshing: false
				};
				this.setState(state);
			});
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveFishingReport();
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
			if (event.id == 'search') { // this is the same id field from the static navigatorButtons definition
        //Alert.alert('NavBar', 'Search button pressed');
			  this.setState({
					visibleModal: 1
				});
      }
      if (event.id == 'status') {
        //Alert.alert('NavBar', 'Status button pressed');
				this.setState({
					visibleModal: 2
				});
      }
		}
	}

	render() {
		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<View>
				<Modal isVisible={this.state.visibleModal === 1}>
					{this._renderModalContent()}
				</Modal>
				<Modal
					isVisible={this.state.visibleModal === 2}
					animationIn={'slideInLeft'}
					animationOut={'slideOutRight'}
				>
					{this._renderModalContent()}
				</Modal>
				<Modal
					isVisible={this.state.visibleModal === 3}
					animationInTiming={2000}
					animationOutTiming={2000}
					backdropTransitionInTiming={2000}
					backdropTransitionOutTiming={2000}
				>
					{this._renderModalContent()}
				</Modal>
				<Modal
					isVisible={this.state.visibleModal === 4}
					backdropColor={'red'}
					backdropOpacity={1}
					animationIn={'zoomInDown'}
					animationOut={'zoomOutUp'}
					animationInTiming={1000}
					animationOutTiming={1000}
					backdropTransitionInTiming={1000}
					backdropTransitionOutTiming={1000}
				>
					{this._renderModalContent()}
				</Modal>
				<Modal isVisible={this.state.visibleModal === 5} style={styles.bottomModal}>
					{this._renderModalContent()}
				</Modal>
				<Modal
					isVisible={this.state.visibleModal === 6}
					onBackdropPress={() => this.setState({ visibleModal: null })}
				>
					{this._renderModalContent()}
				</Modal>
				<ScrollView>
					<Card containerStyle={{padding: 0}}>
					 {
						 this.state.waterbodies.map((u, i) => {
							 let status = (
								 <View style={{width: 50}}>
								 <StarRating
					         disabled={true}
					         maxStars={5}
					         rating={u.rating}
					       />
								 </View>
							 );
							 let subtitle = (
								 <View style={{flexDirection:'column'}}>
								 	<Text style={{flex: 1, flexWrap: 'wrap'}}>{u.kind}</Text>
									{status}
								 </View>
							 );

							 return (
								 <ListItem
								 key={i}
								 title={u.title}
								 subtitle={subtitle}
								 hideChevron={true}
								 />
							 );
						 })
					 }
				 </Card>
				</ScrollView>
			</View>

		)
	}
}

FishingReport.propTypes = {
	actions: PropTypes.object.isRequired,
	waterbodies: PropTypes.array.isRequired,
	navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
	return {
		waterbodies: state.fishing.waterbodies
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(fishingReportActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FishingReport);
