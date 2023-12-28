import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { Button } from 'react-native';
import IonIcon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import Transaction from "./Transaction";
import Budget from "./Budget";
import Home from "./Home";
import AddTransaction from './AddTransaction';



const Bottom = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
    return (
        <IonIcon name={name} size={25} color={focused ? "white" : "#003049"} />
    );
};

const homeScreenOptions = (num, name, name2) => {
    return {
        tabBarLabel: name2,
        tabBarIcon: ({ focused }) => <TabIcon name={name} focused={focused} />,
        tabBarStyle: {
            height: num,
            backgroundColor: '#ffb5a7'
        },
    };
};

const MainTab = () => {

    return (
        <Bottom.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#ffb5a7'
                },
                headerShown: false,
            }}
        >
            <Bottom.Screen name="Home" component={Home} options={homeScreenOptions(50, "home", "Home",)} />
            <Bottom.Screen name="Transaction" component={Transaction} options={homeScreenOptions(50, "grid", "Transaction")} />
            <Bottom.Screen name="Add" component={AddTransaction} options={homeScreenOptions(0, "add", "")} />
            <Bottom.Screen name="Budget" component={Budget}
                options={{
                    ...homeScreenOptions(50, "heart", "Budget"),
                    // tabBarBadge: 3,
                    // tabBarBadgeColor: "red",
                }} />
            <Bottom.Screen name="Profile" component={Profile} options={homeScreenOptions(50, "person", "Profile")} />
        </Bottom.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenText: {
        color: '#000',
    },
});


export default MainTab;