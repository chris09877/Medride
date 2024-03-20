import { StyleSheet, View, } from 'react-native';
import Trips from './Trips';
import Header from './Header';


export default function App() {



  return (
    <View style={styles.container}>
      <Header />
      <Trips />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
