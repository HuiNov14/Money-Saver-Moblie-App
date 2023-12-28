import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider} from './screens/AuthContext'
import AppNavigator from './AppNavigator'

//MSSV: 21520910
//Tên: Bùi Minh Huy

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}