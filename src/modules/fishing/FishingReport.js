import React, { PropTypes, Component } from 'react';
import {
	Platform,
	View,
	ListView,
	Text,
	ScrollView,
	RefreshControl
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as fishingReportActions from './fishingreport.actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/FishingReport';
import { iconsMap } from '../../utils/AppIcons';
import { Card, ListItem, Button } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

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
		}
	}

	render() {
		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView contentContainerStyle={styles.contentContainer}>
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
