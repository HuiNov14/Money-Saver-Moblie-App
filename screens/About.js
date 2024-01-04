import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import IonIcon from "react-native-vector-icons/Ionicons";

function About({ navigation }) {

    const ExitHandle = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <TouchableOpacity onPress={() => ExitHandle()} style={styles.touchable}>
                    <IonIcon name="ios-arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <View style={styles.imgBackground}>
                    <Text style={styles.screenText}>MoneySaver App</Text>
                    <Image
                        style={styles.imageCate}
                        source={require('../assets/information.png')}
                    />
                </View>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>Content: </Text>
                <Text style={styles.contentText}>Welcome to MoneySaver - an utility application that helps you manage your finances intelligently and efficiently. MoneySaver is not just a simple daily expense tracking app; it is also a reliable companion on your journey to control and save your financial resources.</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>Who we are: </Text>
                <Text style={styles.contentText}>With a professional development team, we are committed to providing you with the best user experience. We designed MoneySaver to meet all your needs in personal financial management, from tracking daily expenses to setting long-term saving goals.</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>Key Features: </Text>
                <Text style={styles.contentText2}>Easy Expense Tracking: Record every transaction quickly and easily.</Text>
                <Text style={styles.contentText2}>Smart Expense Reports: Display charts and detailed expense reports to give you an overview of your financial situation.</Text>
                <Text style={styles.contentText2}>Set Saving Goals: Establish saving goals to help you maintain financial principles and achieve long-term plans.</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.titleText}>Share your experience: </Text>
                <Text style={styles.contentText}>We always listen and highly appreciate any feedback from the user community. If you have any suggestions or opinions, feel free to contact us.</Text>
            </View>
            <Text style={styles.thankText}>Thank you for choosing MoneySaver to manage your finances smartly and efficiently!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcd5ce',
    },
    screenText: {
        marginTop: 0,
        color: 'black',
        fontSize: 20,
    },
    imageCate: {
        width: 20,
        height: 20,
        marginLeft: 5,
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
        marginTop: 15,
        flexDirection: 'row',
        marginLeft: 50,
    },
    titleText: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 17,
        color: 'red',
    },
    contentText: {
        marginLeft: 5,
        marginTop: 5,
        color: '#003049',
    },
    contentText2: {
        marginLeft: 5,
        marginTop: 5,
        color: '#003049'
    },
    thankText: {
        marginTop: 50,
        alignSelf: 'center',
        fontSize: 17,
        color: 'red',
    },
});



export default About;