import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import HomeScreen from '../app/screens/home';
import LoginScreen from '../app/screens/login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}
