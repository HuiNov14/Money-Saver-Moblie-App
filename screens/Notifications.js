import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import IonIcon from "react-native-vector-icons/Ionicons";

function Notifications({ navigation }) {

    const ExitHandle = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <TouchableOpacity onPress={() => ExitHandle()} style={styles.touchable}>
                    <IonIcon name="ios-arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Notifications
                </Text>
            </View>
            <View style={styles.imgBackground}>
                <Image
                    style={styles.imageCate}
                    source={require('../assets/box.png')}
                />
                <Text style={styles.screenText}>Nothing to notif</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcd5ce',
    },
    screenText: {
        marginTop: 20,
        color: '#003049',
        fontSize: 25,
    },
    background: {
        // position: 'absolute',
        backgroundColor: '#ffb5a7',
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
    },
    touchable: {
        top: 45,
        left: 12,
        width: 30,
    },
    imgBackground: {
        alignItems: 'center',
        marginTop: 200,
    },
});


export default Notifications;