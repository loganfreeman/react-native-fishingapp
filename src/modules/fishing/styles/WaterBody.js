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

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  listHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listHeadingLeft: {
    fontWeight: 'bold',
  },

});

export default styles;
