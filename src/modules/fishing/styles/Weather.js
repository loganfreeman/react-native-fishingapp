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

  titleContainer:{
     flex: 1,
     borderRightWidth: 1,
     borderRightColor: '#8294a0'
   },
   title:{
     marginTop: 5,
     marginBottom: 5,
     marginRight: 5,
     color: 'black',
     fontWeight: '500',
     textAlign: 'right'
   },
   customTitle:{
     marginTop: 13,
     marginBottom: 13,
     marginRight: 5,
     color: 'black',
     fontWeight: '500',
     textAlign: 'right'
   },
   summaryContainer: {
     flex: 1.5,
     flexDirection: 'row',
     marginTop: 12
   },
   summaryContainerLong: {
     flex: 1.5,
     flexDirection: 'row',
     marginTop: 5
   },
   summary: {
     marginLeft: 20,
     marginRight: 10
   },
   icon: {
     marginTop: -6
   },
   tempContainer: {
     flex: .5,
     flexDirection: 'column',
     marginTop: 3,
     marginRight: 15,
     alignItems: 'flex-end'
   },
   precipImage: {
     marginTop: 3
   },

});

export default styles;
