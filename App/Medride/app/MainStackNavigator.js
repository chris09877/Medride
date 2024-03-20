import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Plate from './pages/plate';
import Home from './pages/Homescreen';
import DetailsPatient from './pages/DetailsPatient';
import DestinationArrived from './pages/DestinationArrived';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Plate" component={Plate} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={DetailsPatient} />
      <Stack.Screen name="Destination" component={DestinationArrived} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
