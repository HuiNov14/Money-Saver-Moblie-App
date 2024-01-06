import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FirebaseAuth } from '../database/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const auth = FirebaseAuth;

  const handleOnPressLogin = () => {
    navigation.goBack();
  }

  const signUpHandle = async () => {
    try {
      if (password !== confirm) {
        Alert.alert('Warning','The password and confirm password do not match.');
      }
      else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Registration successful', 'Please login again');
        console.log('Đăng ký thành công:');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Warning', 'Sign Up Failed');
      console.error('Lỗi đăng ký:', error.code, error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../assets/piggy-bank.png')}
      />
      <Text style={styles.text}>Create New Account</Text>
      <View style={styles.containerTextInput}>
        <Image style={styles.imageTextInput} source={require('../assets/mail.png')} />
        <TextInput
          style={styles.textI}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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

      <TouchableOpacity style={styles.button} onPress={signUpHandle}>
        <Text style={styles.textLogin}>CREATE</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={handleOnPressLogin}>
          <Text style={styles.signUpText}>Login now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb5a7',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 0,
  },
  text: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  textI: {
    flex: 1,
    marginLeft: 10,
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
    backgroundColor: '#FF8C00',
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
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
  },
  signUpText: {
    color: 'blue',
  },
});

export default Signup;