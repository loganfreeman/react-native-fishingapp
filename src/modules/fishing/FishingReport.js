import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	RefreshControl
} from 'react-native';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fishingReportActions from './fishingreport.actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/FishingReport';
import { iconsMap } from '../../utils/AppIcons';

class FishingReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			isRefreshing: false
		};
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveFishingReport();
	}

	_retrieveFishingReport() {
		this.props.actions.retrieveFishingReports()
			.then(() => {
				const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
				const dataSource = ds.cloneWithRows(this.props.waterbodies);
				this.setState({
					waterbodies: this.props.waterbodies,
					dataSource,
					isLoading: false
				});
			});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveFishingReport(true);
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}

	render() {
		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ListView
				style={styles.container}
				enableEmptySections
				dataSource={this.state.dataSource}
				renderRow={(rowData) => <Text>{rowData.title}</Text>}
				renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
				renderFooter={() => <View style={{ height: 50 }}><ProgressBar /></View>}
				refreshControl={
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._onRefresh}
						colors={['#EA0000']}
						tintColor="white"
						title="loading..."
						titleColor="white"
						progressBackgroundColor="white"
					/>
				}
			/>
		)
	}
}


FishingReport.propTypes = {
	actions: PropTypes.object.isRequired,
	waterbodies: PropTypes.object.isRequired,
	navigator: PropTypes.object
};

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

FishingReport.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
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
