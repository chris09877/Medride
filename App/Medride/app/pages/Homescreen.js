import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { separateDateAndTime } from '../components/separateDateAndTime';
import Maps from '../components/Maps';
import Header from '../components/Header';
import TrackingComponent from '../components/Tracking';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();
  const { driverId } = route.params || {};

  const [dataSource, setDataSource] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
  
    try {
      if (!driverId) {
        console.log('Driver ID is undefined');
        setRefreshing(false);
        return;
      }
  
      const response = await fetch(`http:10.2.89.94:5002/drivers/${driverId}/trips`);
      const data = await response.json();
      console.log(data);
      console.log('Data length:', data.trips.length);
      console.log('Driver ID:', driverId);
  
      const sortedTrips = data.trips.sort((a, b) => new Date(a.appointment) - new Date(b.appointment));
  
      setDataSource(sortedTrips);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };
  
  const navigateToDetails = item => {
    navigation.navigate('Details', { trip: item, driverId });
  };
  
  const onRefresh = () => {
    fetchData();
  };

  const renderItem = ({ item }) => {
    if (item.status !== 0) {
      return null;
    }
  
    return (
      <TouchableOpacity onPress={() => navigateToDetails(item)}>
        <View style={styles.items}>
          <View style={styles.itemtext}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>from: {item.from}</Text>
            <Text style={styles.text}>to: {item.to}</Text>
            <Text>{separateDateAndTime(item.appointment)}</Text>
          </View>
          <Maps address={item.from} />
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <FlatList
        data={dataSource}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <TrackingComponent driverId={driverId} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>End Session</Text>
      </TouchableOpacity>
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
  items: {
    justifyContent: 'center',
    marginTop: 25,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  itemtext: {
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 25,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});
