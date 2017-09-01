import React, { Component, PropTypes } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles/Drawer';

class Drawer extends Component {
	constructor(props) {
		super(props);

		this._gotoRun = this._gotoRun.bind(this);
		this._gotoFishing = this._gotoFishing.bind(this);
		this._goToStocking = this._goToStocking.bind(this);
	}

	_openSearch() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Search',
			title: 'Search Movies'
		});
	}

	_goToStocking() {
		this._toggleDrawer();
		this.props.navigator.showModal({
			screen: 'movieapp.Stocking',
			title: 'Stocking Report',
			animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
  		animationType: 'fade'
		});
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}

	_gotoRun() {

	}

	_gotoFishing() {
		this._toggleDrawer();
		this.props.navigator.popToRoot({
			screen: 'movieapp.FishingReport',
			title: 'Fishing Report',
			animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
  		animationType: 'fade'
		});
	}

	render() {
		const iconSearch = (<Icon name="md-search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconMovies = (<Icon name="md-film" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconRun = (<Icon name="md-walk" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconFish = (<Icon name="ios-boat" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconStocking = (<Icon name="md-bookmark" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		const iconTV = (<Icon name="ios-desktop" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={() => ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)}>
							<View style={styles.drawerListItem}>
								{iconRun}
								<Text style={styles.drawerListItemText}>
									All Trails
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._gotoFishing}>
							<View style={styles.drawerListItem}>
								{iconFish}
								<Text style={styles.drawerListItemText}>
									Fishing Report
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._goToStocking}>
							<View style={styles.drawerListItem}>
								{iconStocking}
								<Text style={styles.drawerListItemText}>
									Stocking Report
								</Text>
							</View>
						</TouchableOpacity>
					</View>
					<Text style={styles._version}>
						{/* 'v1.0.0' */}
					</Text>
				</View>
			</LinearGradient>
		);
	}
}

Drawer.propTypes = {
	navigator: PropTypes.object
};

export default Drawer;
