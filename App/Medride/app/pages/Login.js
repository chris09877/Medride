import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const login = async () => {
    try {
      const response = await fetch('http:10.2.89.94:5002/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const { token, driver } = await response.json();
        Cookies.set('token', token);
        console.log('Login Successful', token, driver);
        console.log('Get the cookies', Cookies.get('token'));
        console.log('Driver ID:', driver._id); 
        setErrorMessage('');
        navigation.navigate('Plate', { driverId: driver._id });
        setPassword('');
        setEmail('');
      } else {
        setErrorMessage('Invalid email or password');
        console.log('Login Failed');
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
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <View style={styles.Vbutton}>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={login}
            underlayColor="#fff"
          >

            <Text style={styles.loginText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>{errorMessage}</Text>

      </View>
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
    paddingTop: Platform.OS === 'android' ? 10 : 20,
    alignItems: 'center',
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
  Vbutton: {
    width: '100%',
    alignItems: 'center',
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
  loginText: {
    color: '#0ACF83',
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
