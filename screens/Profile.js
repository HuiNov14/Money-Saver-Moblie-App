import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../LoginNavigator/AuthContext';

const Profile = ({ navigation }) => {
  
  const { email, setisAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    setisAuthenticated(false);
    console.log('Logged Out!');
  };

  const helpHandle = () => {
    navigation.navigate('Help')
  }

  const aboutHandle = () => {
    navigation.navigate('About')
  }

  const settingHandle = () => {
    navigation.navigate('Setting')
  }

  return (
    <View style={styles.container}>
      <View style={styles.ProfileCotainer}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/piggy-bank.png')}
        />
        {/* <Text style={styles.NameText}></Text> */}
        <Text style={styles.MailText}>{email}</Text>
      </View>
      <Image
        style={styles.imageStyle3}
        source={require('../assets/adv.jpg')}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={helpHandle}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/question.png')}
        />
        <Text style={styles.buttonText}>Help & support</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={settingHandle}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/setting.png')}
        />
        <Text style={styles.buttonText}>Setting Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={aboutHandle}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/information.png')}
        />
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLogout}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/logout.png')}
        />
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcd5ce',
  },
  ProfileCotainer: {
    top: 80,
  },
  NameText: {
    marginTop: 10,
    color: '#003049',
    alignSelf: 'center',
  },
  MailText: {
    color: '#003049',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 300,
    height: 30,
    // backgroundColor: '#ffb5a7',
    left: 30,
    borderRadius: 15,
    top: 150,
    marginBottom: 15,
  },
  imageStyle2: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignSelf: 'center',
  },
  imageStyle3: {
    width: 400,
    height: 180,
    alignSelf: 'center',
    marginTop: 150,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#003049',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignSelf: 'center',
  },
});

export default Profile;