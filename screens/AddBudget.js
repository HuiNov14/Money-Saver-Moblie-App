import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Categories from './Categories';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import IonIcon from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-modern-datepicker"
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { createStackNavigator } from '@react-navigation/stack';

function AddBudget({ navigation, route }) {

    const { password, setPassword } = useContext(AuthContext);
    const [price, setPrice] = useState('');
    const [textCate1, setTextCate1] = useState('');
    const [imgCate1, setImgCate1] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [id, setId] = useState('');
    const [data, setData] = useState({ price: '', img: require('../assets/question.png'), categories: '', start: '', end: '' });

    //DATE 
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [startDate, setStartDate] = useState(false);
    const [endDate, setEndDate] = useState(false);
    const [editFlag, setEditFlat] = useState(false);

    //Truyền dữ liệu từ route
    const { textCate, imgCate } = route.params || {};
    const { itemProp } = route.params || {};

    useEffect(() => {
        if (itemProp) {
            setPrice(itemProp.price)
            setStartDate(itemProp.startDate)
            setEndDate(itemProp.endDate)
            setTextCate1(itemProp.categories)
            setImgCate1(itemProp.img)
            setEditFlat(true)
            setId(itemProp.id)
        }
    }, [itemProp, route])

    useEffect(() => {
        setTextCate1(textCate);
        setImgCate1(imgCate);
    }, [textCate, imgCate]);

    //Save dữ liệu
    useEffect(() => {
        navigation.navigate('Budget', { dataProp: data, deleteId: id });
    }, [data]);

    const saveHandle = () => {
        if (!price || !endDate || !startDate || !textCate1) {
            setOpenAlert(!openAlert);
        }
        else if (startDate > endDate) {
            Alert.alert('Warning', 'The end date should be later than the start date')
        } else {
            const newData = { price, img: imgCate1, categories: textCate1, startDate, endDate };
            setData(newData);
            setPrice('')
            setStartDate('')
            setEndDate('')
            setTextCate1('')
            setImgCate1('')
            setEditFlat(false)
        }
    }

    //Delete dữ liệu
    const deleteHandle = () => {
        navigation.navigate('Budget', { dataProp: [], deleteId: id });
        setPrice('')
        setStartDate('')
        setEndDate('')
        setTextCate1('')
        setImgCate1('')
        setEditFlat(false)
        setId('')
    }

    //Exit button
    const ExitHandle = () => {
        navigation.navigate('Budget');
        setPrice('')
        setStartDate('')
        setEndDate('')
        setTextCate1('')
        setImgCate1('')
        setEditFlat(false)
        setId('')
    }

    //Lựa categories
    const onPressHandle = () => {
        setPassword('1');
        navigation.navigate('Select Categories');
    }

    //Chọn date
    function handleDateChange(propDate) {
        setStartDate(propDate)
    }

    function handleDateChange2(propDate) {
        setEndDate(propDate)
    }

    function SelectDatePress() {
        setOpen(!open);
    }

    function SelectDatePress2() {
        setOpen2(!open2);
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <TouchableOpacity onPress={() => ExitHandle()} style={styles.touchable}>
                    <IonIcon name="close" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    {editFlag ? 'Edit Budget' : 'New Budget'}
                </Text>
            </View>

            <TextInput
                multiline
                placeholder="0.........đ"
                keyboardType='numeric'
                value={price}
                onChangeText={(text) => setPrice(text)}
                style={[styles.textInput]}
            />

            <View style={styles.TextInputContainer}>
                <Image
                    style={styles.imageCate}
                    source={imgCate1 ? imgCate1 : require('../assets/question.png')}
                />
                <TouchableOpacity
                    style={[styles.CateSelectStyle]}
                    onPress={onPressHandle}>
                    <Text style={styles.Text}>{textCate1 ? textCate1 : 'Select Categories'}</Text>
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
                    <Text style={styles.Text}>{startDate ? startDate : 'Select Start Date'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.TextInputContainer}>
                <Image
                    style={styles.imageCate}
                    source={require('../assets/calendar.png')}
                />
                <TouchableOpacity
                    style={[styles.CateSelectStyle]}
                    onPress={SelectDatePress2}
                >
                    <Text style={styles.Text}>{endDate ? endDate : 'Select End Date'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={editFlag ? styles.buttonContainer1 : styles.buttonContainer0}
                    onPress={deleteHandle}
                >
                    <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={editFlag ? styles.buttonContainer1 : styles.buttonContainer}
                    onPress={saveHandle}
                >
                    <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType='slide'
                transparent={true}
                visible={open}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <DatePicker
                            mode='calendar'
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

            <Modal
                animationType='slide'
                transparent={true}
                visible={open2}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <DatePicker
                            mode='calendar'
                            onDateChange={handleDateChange2}
                        />

                        <TouchableOpacity
                            style={[styles.DateClose]}
                            onPress={SelectDatePress2}
                        >
                            <Text style={styles.TextClose}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType='slide'
                transparent={true}
                visible={openAlert}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Please provide more infomation</Text>
                        <TouchableOpacity
                            style={[styles.DateClose]}
                            onPress={() => { setOpenAlert(!openAlert) }}
                        >
                            <Text style={styles.TextClose}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

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
    buttonGroup: {
        flexDirection: 'row',
    },
    buttonContainer0: {
        width: 0,
    },
    buttonContainer1: {
        flexDirection: 'row',
        width: 150,
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#ffb5a7',
        borderRadius: 15,
        marginHorizontal: 10,
        marginTop: 50,
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


export default AddBudget;