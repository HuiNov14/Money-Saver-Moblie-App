import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import IonIcon from "react-native-vector-icons/Ionicons";
import { FirebaseAuth } from '../database/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { AuthContext } from '../LoginNavigator/AuthContext';

function Setting({ navigation }) {

    const [password, setPassword] = useState('');
    const { email, setEmail } = useContext(AuthContext);
    const [confirm, setConfirm] = useState('');
    const auth = FirebaseAuth;

    const ExitHandle = () => {
        navigation.goBack();
    }

    const updatePasswordFunct = async (newPassword) => {
        try {
            await updatePassword(newPassword);
            Alert.alert('Password updated successfully');
        } catch (error) {
            Alert.alert('', 'Password updated successfully');
            console.error('Lỗi cập nhật mật khẩu:', error.code, error.message);
        }
    };

    const ChangePassHandle = async () => {
        if (password !== confirm) {
            Alert.alert('Warning', 'The password and confirm password do not match.');
        } else {
            updatePasswordFunct(password);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <TouchableOpacity onPress={() => ExitHandle()} style={styles.touchable}>
                    <IonIcon name="ios-arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Setting
                </Text>
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.screenText}>Change Password</Text>
                <View style={styles.containerTextInput}>
                    <Image style={styles.imageTextInput} source={require('../assets/mail.png')} />
                    <TextInput
                        style={styles.textI}
                        editable={false}
                        value={email}
                    />
                </View>
                <View style={styles.containerTextInput}>
                    <Image style={styles.imageTextInput} source={require('../assets/padlock.png')} />
                    <TextInput
                        style={styles.textI}
                        secureTextEntry={true}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.containerTextInput}>
                    <Image style={styles.imageTextInput} />
                    <TextInput
                        style={styles.textI}
                        secureTextEntry={true}
                        placeholder="Confirm password"
                        value={confirm}
                        onChangeText={setConfirm}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={ChangePassHandle}>
                    <Text style={styles.textLogin}>CHANGE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcd5ce',
        alignContent: 'center',
    },
    mainContainer: {
        marginTop: 150,
    },
    screenText: {
        marginTop: 20,
        color: '#003049',
        fontSize: 25,
        alignSelf: 'center',
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
    textI: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
    },
    containerTextInput: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 25,
        flexDirection: 'row',
        backgroundColor: '#ede7e3'
    },
    imageTextInput: {
        width: 27,
        height: 27,
        marginTop: 11,
        marginLeft: 12,
    },
    button: {
        backgroundColor: '#ffb5a7',
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        width: 300,
        alignSelf: 'center',
        height: 45,
    },
    textLogin: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center',
    },
});


export default Setting;