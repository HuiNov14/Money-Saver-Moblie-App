import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import IonIcon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExpenseCate from './ExpenseCate';
import IncomeCate from './IncomeCate';
import DebtCate from './DebtCate';

const tab = createMaterialTopTabNavigator();

function Categories() {

    return (
        <tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#fcd5ce',
                },
            }}
        >
            <tab.Screen
                name="Expense"
                component={ExpenseCate}
            />
            <tab.Screen
                name="Income"
                component={IncomeCate}
            />
            <tab.Screen
                name="Debt/Loan"
                component={DebtCate}
            />
        </tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcd5ce',
    },
    screenText: {
        color: '#000',
    },
});

export default Categories;