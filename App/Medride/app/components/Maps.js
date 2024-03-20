import React, { useState } from 'react';
import { Linking, Platform, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Maps = ({ address }) => {
  const [showMap, setShowMap] = useState(false);

  const openMapsApp = async (address) => {
    try {
      const url = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });

      const encodedAddress = encodeURIComponent(address);
      const fullAddress = `${url}${encodedAddress}`;

      await Linking.openURL(fullAddress);
    } catch (error) {
      console.log('Error opening maps app: ', error);
    }
  };

  const openMaps = () => {
    openMapsApp(address);
    setShowMap(true);
  };

  return (
    <View>
      {showMap && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
      {showMap ? (
        <TouchableOpacity style={styles.button} onPress={openMaps}>
          <Text style={styles.buttonText}>Route</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={openMaps}>
          <Text style={styles.buttonText}>Route</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(99, 180, 255, 0.1)',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#4894FE',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Maps;
