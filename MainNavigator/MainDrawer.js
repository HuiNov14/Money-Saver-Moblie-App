import React, { useState, useContext } from "react";
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import MainTab from '../screens/MainTab'
import NotificationsDraw from '../screens/NotificationScreen'
import Help from '../screens/Help';
import { Ionicons } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const showHeader = false;
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home "
        component={MainTab}
        options={{ 
          headerShown: showHeader, 
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
        
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsDraw}
        options={{ 
          headerShown: showHeader,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Helps"
        component={Help}
        options={{ 
          headerShown: !showHeader,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;