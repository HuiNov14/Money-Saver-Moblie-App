import React, { useState, useContext } from "react";
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import MainTab from '../screens/MainTab'
import About from '../screens/About'
import Help from '../screens/Help';
import Setting from "../screens/Setting";
import AddBudget from "../screens/AddBudget";
import Chart from "../screens/Chart";
import Notifications from "../screens/Notifications"
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
        name="About"
        component={About}
        options={{
          headerShown: showHeader,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: showHeader,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: showHeader,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AddBudget"
        component={AddBudget}
        options={{
          headerShown: showHeader,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Chart"
        component={Chart}
        options={{
          headerShown: showHeader,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: showHeader,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;