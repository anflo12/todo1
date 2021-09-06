import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginStack} from './LoginStack';
import HomeScreen from '../screens/HomeScreen';
import AddAccount from '../screens/AddAccount';
import ReqTransferScreen from '../screens/ReqTransferScreen';
import SendTranfer from '../screens/SendTranfer';
import ScannerScreen from '../screens/ScannerScreen';
import WeatherScreen from '../screens/WeatherScreen';

const Stack = createStackNavigator();

export function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={LoginStack} />
      <Stack.Screen
        name="Home"
        initialParams={{refreshing: false}}
        options={{title: 'Home', headerShown: true}}
        component={HomeScreen}
      />

      <Stack.Screen
        name="addAccount"
        options={{title: 'Add Account', headerShown: true}}
        component={AddAccount}
      />

      <Stack.Screen
        name="Reqtranfer"
        options={{title: 'Tranfers', headerShown: true}}
        component={ReqTransferScreen}
      />

      <Stack.Screen
        name="Sendtranfer"
        initialParams={{result: []}}
        options={{title: 'Tranfers', headerShown: true}}
        component={SendTranfer}
      />

      <Stack.Screen
        name="Scanner"
        options={{title: 'Tranfers', headerShown: false}}
        component={ScannerScreen}
      />

      <Stack.Screen
        name="Weather"
        options={{title: 'Tranfers', headerShown: false}}
        component={WeatherScreen}
      />
    </Stack.Navigator>
  );
}
