import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import IonIcon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

function NotificationsScreen({ navigation }) {
    const onPressHandle = () => {
        navigation.navigate('Notifications Details Screen');

    }
    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.touchable}>
                    <IonIcon name="menu-outline" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Notifications
                </Text>
            </View>
            <Text style={styles.screenText}>
                Notifications Screen
            </Text>
            <Button
                onPress={onPressHandle}
                title="Go to details"
            />
        </View>
    )
}

function NotificationsDetailScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.screenText}>
                Notifications Detail Screen
            </Text>
        </View>
    )
}

function NotificationsDraw() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Notifications Screen"
                component={NotificationsScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Notifications Details Screen"
                component={NotificationsDetailScreen}
            />
        </Stack.Navigator>
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
    touchable: {
        top: 45,
        left: 12,
        width: 30,
    },
    background: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        left: 0,
        width: '100%',
        height: 90,
    },
    headerText: {
        top: 13,
        color: 'black',
        left: 66,
        fontSize: 21,
        fontWeight: 'bold',
    }
});


export default NotificationsDraw;