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

  weatherForcast: {
    flex: 1
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  listHeading: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 30
  },
  listHeadingLeft: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  listHeadingRight: {
    color: 'white',
    ...Platform.select({
      ios: {
        fontSize: 15
      },
      android: {
        fontSize: 16
      }
    })
  },

});

export default styles;
