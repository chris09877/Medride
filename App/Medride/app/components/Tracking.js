import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const TrackingComponent = ({ driverId }) => { 

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        trackLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
    }
  };

  const trackLocation = async () => {
    try {
      Location.watchPositionAsync(
        { distanceInterval: 10 },
        location => {
          const { latitude, longitude } = location.coords;
          updateLocation(latitude, longitude);
        }
      );
    } catch (error) {
      console.log('Error watching location:', error);
    }
  };

  const updateLocation = async (latitude, longitude) => {
    const url = `http:10.2.89.94:5002/drivers/update/${driverId}`;

    const location = [latitude, longitude];

    try {
      await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });
      console.log(`Location updated successfully! ${location}`);
    } catch (error) {
      console.log('Error updating location:', error);
    }
  };
};

export default TrackingComponent;
