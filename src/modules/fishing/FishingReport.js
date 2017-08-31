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
import styles from './styles/FishingReport';
import { iconsMap } from '../../utils/AppIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, List, ListItem, Button, CheckBox, SearchBar } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';
import { RadioButtons } from 'react-native-radio-buttons'
import { range } from 'lodash';

const options = [
	"All",
	"Hot",
	"Good",
	"Fair",
	"Slow",
	"Closed"
];


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

	_setKeyword(keyword) {

	}

	_renderSearchModal = () => {
		function onChangeText(keyword) {
			this.setState({
				keyword
			})
		}

		function search() {
			let waterbodies;
			if(!this.state.keyword || !this.state.keyword.trim()) {
				waterbodies = this.props.waterbodies;
			}else {
				let reg;
				try {
					reg = new RegExp(this.state.keyword, 'i');
					waterbodies = this.props.waterbodies.filter(item => {
						return item.title.match(reg);
					})
				}catch(e) {
					waterbodies = this.props.waterbodies;
				}
			}

			this.setState({
				waterbodies: waterbodies,
				visibleModal: null
			});
		}

		function clear() {
			this.setState({
				keyword: null,
				waterbodies: this.props.waterbodies,
				visibleModal: null
			});
		}
		return (
			<View style={styles.modalContent}>
				<View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
					<SearchBar
						lightTheme
					  onChangeText={onChangeText.bind(this)}
					  placeholder='Type Here...' />
	      </View>
				{this._renderButton('Reset', clear.bind(this))}
				{this._renderButton('Search', search.bind(this))}
			</View>
		);
	};

  _renderModalContent = () => {

		function renderOption( option, selected, onSelect, index) {

      const textStyle = {
        paddingTop: 10,
        paddingBottom: 10,
        color: 'black',
        flex: 1,
        fontSize: 14,
      };
      const baseStyle = {
        flexDirection: 'row',
      };
      var style;
      var checkMark;

      if (index > 0) {
        style = [baseStyle, {
          borderTopColor: '#eeeeee',
          borderTopWidth: 1,
        }];
      } else {
        style = baseStyle;
      }

      if (selected) {
        checkMark = <Text style={{
          flex: 0.1,
          color: '#007AFF',
          fontWeight: 'bold',
          paddingTop: 8,
          fontSize: 20,
          alignSelf: 'center',
        }}>✓</Text>;
      }

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <View style={style}>
            <Text style={textStyle}>{option}</Text>
            {checkMark}
          </View>
        </TouchableWithoutFeedback>
      );
    }

		function renderContainer(options){
      return (
        <View style={{
          backgroundColor: 'white',
          paddingLeft: 20,
          borderTopWidth: 1,
          borderTopColor: '#cccccc',
          borderBottomWidth: 1,
          borderBottomColor: '#cccccc',
        }}>
          {options}
        </View>
      );
    }

		function setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    };

		 function setStatus() {
			 if(!this.state.selectedOption || this.state.selectedOption === 'All') {
				 this.setState({
	 				waterbodies: this.props.waterbodies,
	 				visibleModal: null
	 			});
				return;
			 }
			let waterbodies = this.props.waterbodies.filter(item => {
				return item.status === this.state.selectedOption;
			});
			this.setState({
				waterbodies: waterbodies,
				visibleModal: null
			})
		}

		return (
			<View style={styles.modalContent}>
				<View style={{marginTop: 10, padding: 20, backgroundColor: 'white'}}>
	        <Text style={{paddingBottom: 10, fontWeight:'bold'}}>Choose status</Text>
	        <RadioButtons
	          options={ options }
	          onSelection={ setSelectedOption.bind(this) }
	          selectedOption={this.state.selectedOption }
	          renderOption={ renderOption }
	          renderContainer={ renderContainer }
	        />
	        <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
	      </View>
				{this._renderButton('Confirm', setStatus.bind(this))}
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

	_onWaterbodySelect(water) {
		this.props.navigator.showModal({
			screen: 'movieapp.WaterBody',
			title: water.title,
			passProps: {
				water
			},
			backButtonHidden: true,
			navigatorButtons: {
				rightButtons: [
					{
						id: 'close',
						icon: iconsMap['ios-arrow-round-down']
					}
				]
			}
		});
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
			if (event.id == 'status') { // this is the same id field from the static navigatorButtons definition
        //Alert.alert('NavBar', 'Search button pressed');
			  this.setState({
					visibleModal: 1
				});
      }
      if (event.id == 'search') {
        //Alert.alert('NavBar', 'Status button pressed');
				this.setState({
					visibleModal: 2
				});
      }
		}
	}

	render() {
		const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;
		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<View style={styles.container}>
				<Modal isVisible={this.state.visibleModal === 1}>
					{this._renderModalContent()}
				</Modal>
				<Modal isVisible={this.state.visibleModal === 2}>
					{this._renderSearchModal()}
				</Modal>
				<ScrollView style={{marginBottom: 25}}>
					<Card containerStyle={{padding: 25, marginBottom: 50}} titleStyle={{display: 'none'}}>
					 {
						 this.state.waterbodies.map((u, i) => {
							 let status = (
								 <View style={{flex: 1, flexDirection: 'row'}}>
								 {
									 range(u.rating).map((e, i) => {
										 return (
											 <Icon name="md-star" size={24} color="#F5B642" key={i}/>
										 );
									 })
								 }
								 </View>
							 );
							 let subtitle = (
								 <View style={{flex: 1, flexDirection:'column'}}>
								 	{status}
									<Text style={{flex: 1, flexWrap: 'wrap'}}>{u.kind}</Text>
								 </View>
							 );

							 return (
								 <ListItem
								 key={i}
								 title={u.title}
								 subtitle={subtitle}
								 hideChevron={true}
								 onPress={this._onWaterbodySelect.bind(this, u)}
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
