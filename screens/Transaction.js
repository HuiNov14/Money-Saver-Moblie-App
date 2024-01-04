import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal } from 'react-native'
import React, { useEffect, useState } from 'react';
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DatePicker from "react-native-modern-datepicker"
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

const Transaction = ({ navigation, route }) => {

    //---------------------------Data process--------------------------------//
    const [data, setData] = useState([
        { price: '10,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2023/12/26', note: 'dinner', with: 'friend' },
        { price: '10,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2023/12/26', note: 'dinner', with: 'friend' },
        { price: '1,000,000', img: require('../assets/salary.png'), cateType: 'income', categories: 'Salary', date: '2023/12/26', note: 'lương', with: 'friend' },
        { price: '100,000', img: require('../assets/salary.png'), cateType: 'income', categories: 'Salary', date: '2023/12/27', note: 'lương', with: 'friend' },
        { price: '90,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2023/12/27', note: 'dinner', with: 'friend' },
        { price: '70,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2023/12/28', note: 'dinner', with: 'friend' },
        { price: '70,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2024/01/28', note: 'dinner', with: 'friend' },
        { price: '70,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2024/01/28', note: 'dinner', with: 'friend' },
        { price: '70,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2024/01/27', note: 'dinner', with: 'friend' },
    ])

    //Month Change
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('2024/01');

    const handleMonthPress = (month) => {
        setSelectedMonth(month)
    }

    function handleMonthChange(propDate) {
        month = propDate.replace(/\s/g, '/');
        setDate(month)
    }

    function SelectMonthPress() {
        setOpen(!open)
        setSelectedMonth(date)
    }

    //Switch to Edit Screen
    const SwToEdit = (itemProp) => {
        navigation.navigate('AddScreen', { itemProp: itemProp });
    }

    //Insert data mới
    const { dataProp } = route.params || {};

    useEffect(() => {
        if (dataProp && dataProp.price) {
            setData(prevData => [...prevData, dataProp]);
        }
    }, [dataProp]);

    //Group data theo date
    const groupedData = data.reduce((acc, item) => {
        const existingGroup = acc.find((group) => group.date === item.date);

        if (existingGroup) {
            existingGroup.items.push(item);
        } else {
            acc.push({ date: item.date, items: [item] });
        }

        return acc;
    }, []);

    //Display
    return (
        <View style={styles.container} >
            <View style={styles.background}>
                <Text style={styles.headerText}>
                    Balance
                </Text>
                <Text style={styles.headerText2}>
                    900,000,000 đ
                </Text>
                <View style={styles.TotalContainer}>
                    <Image
                        style={styles.TotalImage}
                        source={require('../assets/wallet.png')}
                    />
                    <Text style={styles.TotalText}>
                        Cash
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer2}
                    onPress={SelectMonthPress}
                >
                    <Image
                        style={styles.imageStyle2}
                        source={require('../assets/filter.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.MonthSelectContainer}>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === '2023/12' && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress('2023/12')}
                >
                    <Text style={styles.MonthText}>
                        LAST MONTH
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === '2024/01' && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress('2024/01')}
                >
                    <Text style={styles.MonthText}>
                        THIS MONTH
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === '2024/02' && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress('2024/02')}
                >
                    <Text style={styles.MonthText}>
                        NEXT MONTH
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.reviewContainer}>
                <View style={styles.reviewLine}>
                    <Text style={styles.reviewText}>Inflow:</Text>
                    <Text style={styles.reviewText}>10,000,000</Text>
                </View>
                <View style={styles.reviewLine}>
                    <Text style={styles.reviewText}>Outflow:</Text>
                    <Text style={styles.reviewText}>9,000,000</Text>
                </View>
                <View style={styles.Line}></View>
                <View style={styles.reviewLine}>
                    <Text style={styles.reviewText}></Text>
                    <Text style={styles.reviewText}>1,000,000</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.buttonContainer}
            // onPress={() => addNote(title, context)}
            >
                <Image
                    style={styles.imageStyle}
                    source={require('../assets/pie-chart.png')}
                />
                <Text style={styles.buttonText}>View report for {selectedMonth}</Text>
            </TouchableOpacity>

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={groupedData.filter(group => group.date.startsWith(selectedMonth))}
                renderItem={({ item: group }) => (
                    <>
                        <View style={styles.itemContainer}>
                            <View style={styles.detailTopItem}>
                                <Text style={styles.dateItem}>{group.date}</Text>
                            </View>
                            {group.items.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => SwToEdit(item)}
                                    activeOpacity={0.9}
                                >
                                    <View style={styles.detailItem}>
                                        <View style={styles.detailMainItem}>
                                            <View style={styles.CateContainer}>
                                                <Image
                                                    style={styles.imgItem}
                                                    source={item.img}
                                                />
                                                <View style={styles.CateContainer1}>
                                                    <Text style={styles.CateItem}>{item.categories}</Text>
                                                    <Text style={styles.NoteItem}>{item.note}</Text>
                                                </View>
                                            </View>

                                            <Text style={styles.PriceItem}>{item.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            <View style={styles.detailBotItem}></View>
                        </View>
                    </>
                )}
            />
            <Modal
                animationType='slide'
                transparent={true}
                visible={open}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <DatePicker
                            mode='monthYear'
                            onMonthYearChange={handleMonthChange}
                        />

                        <TouchableOpacity
                            style={[styles.DateClose]}
                            onPress={SelectMonthPress}
                        >
                            <Text style={styles.TextClose}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fcd5ce',
    },
    screenText: {
        color: '#003049',
    },
    background: {
        // position: 'absolute',
        backgroundColor: '#fcd5ce',
        top: 0,
        left: 0,
        width: '100%',
        height: 150,
        borderBottomWidth: 0.5,
        borderColor: '#003049',
        alignItems: 'center',
    },
    headerText: {
        marginTop: 30,
        color: '#003049',
        fontSize: 18,
        fontWeight: '100',
    },
    headerText2: {
        color: '#003049',
        fontSize: 21,
        fontWeight: 'bold',
    },
    touchable: {
        top: 45,
        left: 12,
        width: 30,
    },
    buttonContainer2: {
        flexDirection: 'row',
        position: 'absolute',
        width: 20,
        height: 20,
        marginTop: 60,
        right: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    imageStyle2: {
        width: 25,
        height: 25,
        marginRight: 0,
        alignSelf: 'center',
    },
    TotalContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TotalImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    TotalText: {
        fontSize: 15,
    },
    MonthSelectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,

    },
    MonthTouch: {

    },
    MonthText: {
        fontSize: 15,
    },
    SelectedMonth: {
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    reviewContainer: {
        padding: 10,
        paddingTop: 20,
        marginTop: 10,
        borderTopWidth: 0.5,
    },
    reviewLine: {
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'space-between',
    },
    reviewText: {
        fontSize: 16,
    },
    Line: {
        width: 100,
        height: 1,
        backgroundColor: 'black',
        alignSelf: 'flex-end'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 250,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffb5a7',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 20,
    },
    imageStyle: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        fontWeight: '200',
    },
    detailItem: {

    },
    itemContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        elevation: 5,
        borderRadius: 1,
        marginBottom: 40,
    },
    detailTopItem: {
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#ffb5a7',
    },
    detailMainItem: {
        backgroundColor: '#fcd5ce',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        margin: 5,
    },
    detailBotItem: {

    },
    imgItem: {
        width: 27,
        height: 27,
        marginRight: 15,
        marginLeft: 10,
        alignSelf: 'center',
    },
    CateContainer: {
        flexDirection: 'row'
    },
    PriceItem: {
        marginRight: 10,
        alignSelf: 'center',
    },
    dateItem: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    CateItem: {
        fontWeight: 'bold',
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
})

export default Transaction;