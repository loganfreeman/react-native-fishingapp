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
import { Card, Button, SearchBar } from 'react-native-elements';
import Modal from 'react-native-modal';

class Stocking extends Component {
	static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../img/find.png'), // for icon button, provide the local image asset name
        id: 'search' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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

	_renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

	_renderSearchModal = () => {
		function onChangeText(keyword) {
			this.setState({
				keyword
			})
		}

		function search() {
			let stocking;
			if(!this.state.keyword || !this.state.keyword.trim()) {
				stocking = this.props.stocking;
			}else {
				let reg;
				try {
					reg = new RegExp(this.state.keyword, 'i');
					stocking = this.props.stocking.filter(item => {
						return item.watername.match(reg);
					})
				}catch(e) {
					console.error(e);
					stocking = this.props.stocking;
				}
			}

			this.setState({
				stocking: stocking,
				visibleModal: null
			});
		}

		function clear() {
			this.setState({
				keyword: null,
				stocking: this.props.stocking,
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

  _onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'close') {
        this.props.navigator.dismissModal();
      }
			if (event.id == 'search') {
				this.setState({
					visibleModal: 1
				})
      }
			if (event.id == 'calendar') {

      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stocking) this.setState({
			isLoading: false,
			stocking: nextProps.stocking,
			isRefreshing: false
		});
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
    const { stocking } = this.state;

    return (
      this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView style={styles.container}>
				<Modal isVisible={this.state.visibleModal === 1}>
					{this._renderSearchModal()}
				</Modal>
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
