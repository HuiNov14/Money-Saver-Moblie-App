import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import IonIcon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

function HomeDetails() {

  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>
        900,000,000
      </Text>
    </View>
  )
}

function HomeDraw({ navigation }) {
  const onPressHandle = () => {
    navigation.navigate('Home Details');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.TotalCash}>
        900,000,000  đ
      </Text>
      <Text style={styles.TotalCashText}>
        Total Cash
      </Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPressHandle}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/bell.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

const Home = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeDraw"
        component={HomeDraw}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Home Details"
        component={HomeDetails}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcd5ce',
  },
  TotalCash: {
    marginTop: 50,
    left: 20,
    fontSize: 20,
  },
  TotalCashText: {
    marginTop: 5,
    left: 20,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: 30,
    height: 30,
    marginTop: 60,
    right: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  imageStyle2: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignSelf: 'center',
  },
});

export default Home;