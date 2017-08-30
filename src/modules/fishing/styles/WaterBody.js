import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
		backgroundColor: 'black',
		...Platform.select({
			ios: {
				paddingTop: 64
			}
		})
	},

  progressBar: {
		backgroundColor: '#0a0a0a',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

});

export default styles;
