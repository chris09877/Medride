import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { separateDateAndTime } from '../components/separateDateAndTime';
import Maps from '../components/Maps';
import Header from '../components/Header';
import TrackingComponent from '../components/Tracking';
import { SafeAreaView } from 'react-native-safe-area-context';

const DestinationArrived = ({ route, navigation }) => {
  const { trip } = route.params;
  const { driverId } = route.params || {};

  console.log('Driver ID:', driverId);

  const handleArrived = async () => {
  try {
    const updateResponse = await fetch(`http:10.2.89.94:5002/trips/update/${trip._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 1,
      }),
    });

    if (updateResponse.ok) {

      const deleteResponse = await fetch(`http://localhost:5002/drivers/${driverId}/trips/delete/${trip._id}`, {
        method: 'DELETE',
      });

      if (deleteResponse.ok) {
        navigation.navigate('Home', { driverId });
      } else {
        console.log('Failed to delete the trip');
      }
    } else {
      console.log('Failed to update the trip status');
    }
  } catch (error) {
    console.log('Error: ', error);
  }
};


  return (
  <View style={styles.container}>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <View style={styles.spacebetween}></View>
      <View style={styles.borderContainer}>
        <View style={styles.items}>
          <View style={styles.itemtext}>
            <Text style={styles.text}>Name: {trip.name}</Text>
            <Text style={styles.text}>Address: {trip.to}</Text>
            <Text style={styles.text}>Time: {separateDateAndTime(trip.appointment)}</Text>
          </View>
        </View>
        <Maps address={trip.to} />
      </View>

      <View style={styles.spacebetween}></View>
<View style={styles.Arrived}>
      <TouchableOpacity style={styles.Arrivedbutton} onPress={handleArrived}>
        <Text style={styles.ArrivedbuttonText}>Arrived</Text>
      </TouchableOpacity>
</View>
      <View style={styles.backbutton}>
        <TouchableOpacity style={styles.gbackbutton} onPress={() => navigation.goBack()}>
          <Text style={styles.gbackbuttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      <TrackingComponent driverId={driverId} />
    </View>
);
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    alignItems: 'center',
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    width: '70%',
  },
  itemtext: {
    paddingBottom: 20,
  },
  Arrivedbutton: {
    backgroundColor: '#0ACF83',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  ArrivedbuttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
 gbackbutton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
  gbackbuttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  backbutton: {
    width: '40%',
    
  },

 Arrived: {
    width: '66%',
    paddingBottom: Platform.OS === 'android' ? '60%' : '80%',
    
  },
  text: {
    fontSize: 16,
    padding: 2,
  },
  spacebetween: {
    paddingBottom: 20,
  },


});

export default DestinationArrived;

