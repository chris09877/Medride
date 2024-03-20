import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Plate() {
  const navigation = useNavigation();
  const [plateNumber, setPlateNumber] = useState('');
  const route = useRoute();
  const { driverId } = route.params || {};
  const [errorMessage, setErrorMessage] = useState('');


  const disconnect = () => {
    navigation.navigate('Login');
  };

  const submitPlateNumber = () => {
    if (plateNumber.trim() !== '') {
      checkPlateNumberValidity();
    }
  };

  const checkPlateNumberValidity = async () => {
    try {
      const response = await fetch(`http:10.2.89.94:5002/drivers/plate/${plateNumber}`);
      if (response.ok) {
        const { driver } = await response.json();
        if (driver) {
          console.log('Driver:', driver);
          navigation.navigate('Home', { driverId });
        setPlateNumber('');
        setErrorMessage('');
        } else {
        console.log('Failed to fetch plate number');

        }
      } else {
        console.log('Invalid plate number');
        setErrorMessage('Plate number doesn\'t match');

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
 
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../../assets/Logo_App.png')} />
      </View>
      <View style={styles.inputview}>
        <TextInput
          style={styles.input}
          placeholder="Plate number"
          onChangeText={(text) => setPlateNumber(text)}
          value={plateNumber}
        />
        <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={submitPlateNumber}
          underlayColor="#fff"
        >
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
      </View>
        <Text style={styles.errorText}>{errorMessage}</Text>
      <View style={styles.disconnectContainer}>
        <TouchableOpacity
          style={styles.disconnectScreenButton}
          onPress={disconnect}
          underlayColor="#fff"
        >
          <Text style={styles.disconnectText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ACF83',
    paddingTop: Platform.OS === 'android' ? 90 : 230,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputview: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: Platform.OS === 'android' ? 10 : 20,
  },
  input: {
    height: 40,
    width: '75%',
    margin: 12,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 15,
  },
  loginScreenButton: {
    height: 40,
    width: '75%',
    margin: 12,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  disconnectContainer: {
    paddingTop: '40%',
    width: '100%',
    alignItems: 'center',
  },
  disconnectScreenButton: {
    height: 40,
    width: '40%',
    margin: 12,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F24E1E',
    borderRadius: 12,
  },
  disconnectText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
