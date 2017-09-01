import React, { PropTypes } from 'react';
import {
	Text,
	View
} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles/ShowInfo';

const ShowInfo = ({ info }) => {
	const firstAirDate = moment(info.first_air_date).format('LL');
  const lastAirDate = moment(info.last_air_date).format('LL');
  const createdBy = info.created_by.map(p => p.name).join(", ");
  const stars = Math.round((info.popularity / 100 ) * 5);
	return (
		<View style={styles.container}>
			<View style={styles.overview}>
				<Text style={styles.label}>
					Overview
				</Text>
				<Text style={styles.overviewText}>
					{info.overview}
				</Text>
			</View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      {
        _.range(stars).map((e, i) => {
          return (
            <Icon name="md-star" size={24} color="#F5B642" key={i}/>
          );
        })
      }
      </View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>First Air Date</Text>
				<Text style={styles.value}>{firstAirDate}</Text>
			</View>
      <View style={styles.labelRow}>
				<Text style={styles.label}>Last Air Date</Text>
				<Text style={styles.value}>{lastAirDate}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Created By</Text>
				<Text style={styles.value}>{createdBy}</Text>
			</View>
			<View style={styles.labelRow}>
				<Text style={styles.label}>Number of episodes</Text>
				<Text style={styles.value}>{info.number_of_episodes}</Text>
			</View>

		</View>
	);
};

ShowInfo.propTypes = {
	info: PropTypes.object.isRequired
};

export default ShowInfo;
