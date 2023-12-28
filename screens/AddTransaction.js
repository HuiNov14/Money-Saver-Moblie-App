import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import Categories from './Categories';
import { useNavigation } from '@react-navigation/native';
import IonIcon from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-modern-datepicker"
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { createStackNavigator } from '@react-navigation/stack';

// import { db } from './db';

const Stack = createStackNavigator();

function AddScreen({ navigation, route }) {

  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');

  const { textCate, imgCate } = route.params || {};

  //DATE 
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');

  const onPressHandle = () => {
    navigation.navigate('Select Categories');
  }

  function handleDateChange(propDate) {
    setDate(propDate)
  }

  function SelectDatePress() {
    setOpen(!open);
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <TouchableOpacity onPress={() => navigation.navigate('Transaction')} style={styles.touchable}>
          <IonIcon name="close" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          Home
        </Text>
      </View>

      <TextInput
        multiline
        placeholder="0.........đ"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={[styles.textInput]}
      />

      <View style={styles.TextInputContainer}>
        <Image
          style={styles.imageCate}
          source={imgCate ? imgCate : require('../assets/question.png')}
        />
        <TouchableOpacity
          style={[styles.CateSelectStyle]}
          onPress={onPressHandle}>
          <Text style={styles.Text}>{textCate ? textCate : 'Select Categories'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.TextInputContainer}>
        <Image
          style={styles.imageCate}
          source={require('../assets/calendar.png')}
        />
        <TouchableOpacity
          style={[styles.CateSelectStyle]}
          onPress={SelectDatePress}
        >
          <Text style={styles.Text}>{date ? date : 'Select Date'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.TextInputContainer}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/list-text.png')}
        />
        <TextInput
          multiline
          placeholder="Note....."
          value={context}
          onChangeText={(text) => setContext(text)}
          style={[styles.textInput2]}
        />
      </View>

      <View style={styles.TextInputContainer}>
        <Image
          style={styles.imageStyle}
          source={require('../assets/group.png')}
        />
        <TextInput
          multiline
          placeholder="With....."
          value={context}
          onChangeText={(text) => setContext(text)}
          style={[styles.textInput2]}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
      // onPress={() => addNote(title, context)}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/diskette.png')}
        />
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <Modal
        animationType='slide'
        transparent={true}
        visible={open}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <DatePicker
              mode='calendar'
              selected={startDate}
              onDateChange={handleDateChange}
            />

            <TouchableOpacity
              style={[styles.DateClose]}
              onPress={SelectDatePress}
            >
              <Text style={styles.TextClose}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const AddTransaction = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffb5a7',
        },
        headerTintColor: '#003049',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
      }}
    >
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Select Categories"
        component={Categories}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fcd5ce',
  },
  TextInputContainer: {
    flexDirection: 'row',
  },
  CateSelectStyle: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    width: '80%',
    marginBottom: 20,
    padding: 10,
    color: '#000',
    alignSelf: 'center',
  },
  textInput: {
    marginTop: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '80%',
    marginBottom: 20,
    marginLeft: 50,
    padding: 10,
    color: '#000',
  },
  textInput2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '80%',
    marginBottom: 20,
    padding: 10,
    color: '#000',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: 200,
    height: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffb5a7',
    borderRadius: 15,
  },
  imageStyle: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginTop: 10,
  },
  imageStyle2: {
    width: 15,
    height: 15,
    marginRight: 10,
    alignSelf: 'center',
  },
  imageCate: {
    width: 35,
    height: 35,
    marginRight: 10,
    marginTop: 5,
  },
  buttonText: {
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f0e6ef',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  DateClose: {
    borderWidth: 0.5,
    alignItems: 'center',
    marginTop: 15,
    padding: 5,
    width: 120,
    height: 30,
    backgroundColor: '#7bdff2', 
    borderRadius: 5,
  },
  TextClose: {
    color: 'white',
    fontSize: 15,
  },
});

export default AddTransaction;