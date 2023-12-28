import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Profile = () => {
  const { setisAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    setisAuthenticated(false);
    console.log('Logged Out!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.ProfileCotainer}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/piggy-bank.png')}
        />
        <Text style={styles.NameText}>nick name</Text>
        <Text style={styles.MailText}>mail@gmail.com</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLogout}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/question.png')}
        />
        <Text style={styles.buttonText}>Help & support</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLogout}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/setting.png')}
        />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleLogout}
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
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 300,
    height: 30,
    // backgroundColor: '#ffb5a7',
    left: 30,
    borderRadius: 15,
    top: 470,
    marginBottom: 15,
  },
  imageStyle2: {
    width: 20,
    height: 20,
    marginRight: 10,
    alignSelf: 'center',
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