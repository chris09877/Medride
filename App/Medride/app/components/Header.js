import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MedRide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0ACF83',
    alignItems: 'center',
    justifyContent: 'center',
    width: 450,
    padding: 15
  },
  text: {
    color: 'white',
    fontSize: 24,
    padding: 10
  }
});