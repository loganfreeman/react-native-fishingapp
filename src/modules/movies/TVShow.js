import React, { PropTypes, Component } from 'react';
import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as moviesActions from './movies.actions';
import CardOne from './components/CardOne';
import CardTwo from './components/CardTwo';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/TVShow';
import { iconsMap } from '../../utils/AppIcons';

class TVShow extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			isRefreshing: false
		};

		this._viewShow = this._viewShow.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
	}

	componentWillMount() {
		this._retrieveShows();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.nowPlayingShows && nextProps.popularShows) {
			this.setState({ isLoading: false });
		}
	}

	_retrieveShows(isRefreshed) {
		this.props.actions.retrieveNowPlayingShows();
		this.props.actions.retrievePopularShows();
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_viewShowsList(type, title) {
		let rightButtons = [];
		if (Platform.OS === 'ios') {
			rightButtons = [
				{
					id: 'close',
					title: 'Close',
					icon: iconsMap['ios-close']
				}
			];
		}
		this.props.navigator.showModal({
			title,
			screen: 'movieapp.MoviesList',
			passProps: {
				type
			},
			navigatorButtons: {
				rightButtons
			}
		});
	}

	_viewShow(movieId) {
		this.props.navigator.showModal({
			screen: 'movieapp.Movie',
			passProps: {
				movieId,
				type: 'tv'
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

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveShows('isRefreshed');
	}

	_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'search') {
				let rightButtons = [];
				if (Platform.OS === 'ios') {
					rightButtons = [
						{
							id: 'close',
							title: 'Close',
							icon: iconsMap['ios-close']
						}
					];
				}
				this.props.navigator.showModal({
					screen: 'movieapp.Search',
					title: 'Search',
					navigatorButtons: {
						rightButtons
					}
				});
			}
		}
	}

	render() {
		const { nowPlayingShows, popularShows } = this.props;
		const iconPlay = <Icon name="md-play" size={21} color="#9F9F9F" style={{ paddingLeft: 3, width: 22 }} />;
		const iconTop = <Icon name="md-trending-up" size={21} color="#9F9F9F" style={{ width: 22 }} />;
		const iconUp = <Icon name="md-recording" size={21} color="#9F9F9F" style={{ width: 22 }} />;
		const iconPopular = <Icon name="md-heart" size={21} color="#9F9F9F" style={{ width: 22 }} />;

		return (
			this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
			<ScrollView
				style={styles.container}
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
				}>
				<Swiper
					autoplay
					autoplayTimeout={4}
					showsPagination={false}
					height={248}>
					{nowPlayingShows.results.map(info => (
						<CardOne key={info.id} info={info} viewMovie={this._viewShow} />
					))}
				</Swiper>
				<View>
					<View style={styles.listHeading}>
						<Text style={styles.listHeadingLeft}>Popular</Text>
						<TouchableOpacity>
							<Text
								style={styles.listHeadingRight}
								onPress={this._viewShowsList.bind(this, 'tv/popular', 'Popular')}>
								See all
							</Text>
						</TouchableOpacity>
					</View>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{popularShows.results.map(info => (
							<CardTwo key={info.id} info={info} viewMovie={this._viewShow} />
						))}
					</ScrollView>
					<View style={styles.browseList}>
						<TouchableOpacity activeOpacity={0.7}>
							<View style={styles.browseListItem}>
								{iconPlay}
								<Text
									style={styles.browseListItemText}
									onPress={this._viewShowsList.bind(this, 'tv/on_the_air', 'Now Playing')}>
									On the air
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.7}>
							<View style={styles.browseListItem}>
								{iconTop}
								<Text style={styles.browseListItemText} onPress={this._viewShowsList.bind(this, 'tv/top_rated', 'Top Rated')}>
									Top Rated
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={0.7}>
							<View style={styles.browseListItem}>
								{iconUp}
								<Text
									style={styles.browseListItemText}
									onPress={this._viewShowsList.bind(this, 'tv/upcoming', 'Upcoming')}>
									Upcoming
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}
}

TVShow.propTypes = {
	actions: PropTypes.object.isRequired,
	nowPlayingShows: PropTypes.object.isRequired,
	popularShows: PropTypes.object.isRequired,
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

TVShow.navigatorStyle = {
	...navigatorStyle,
	statusBarColor: 'black',
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state, ownProps) {
	return {
		nowPlayingShows: state.movies.nowPlayingShows,
		popularShows: state.movies.popularShows
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(moviesActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TVShow);
