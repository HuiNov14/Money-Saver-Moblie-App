import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react';
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const Transaction = () => {

    const [selectedMonth, setSelectedMonth] = useState('THIS MONTH');

    const handleMonthPress = (month) => {
        setSelectedMonth(month);
    };

    const [data, setData] = useState([
        { price: '10,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2023/12/26', note: 'dinner', with: 'friend' },
        { price: '10,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2023/12/26', note: 'dinner', with: 'friend' },
        { price: '1,000,000', img: require('../assets/salary.png'), cateType: 'income', categories: 'Salary', date: '2023/12/26', note: 'lương', with: 'friend' },
        { price: '100,000', img: require('../assets/salary.png'), cateType: 'income', categories: 'Salary', date: '2023/12/26', note: 'lương', with: 'friend' },
        { price: '90,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2023/12/26', note: 'dinner', with: 'friend' },
        { price: '70,000', img: require('../assets/restaurant.png'), cateType: 'expense', categories: 'Food & beverage', date: '2023/12/26', note: 'dinner', with: 'friend' },
    ])

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
            </View>

            <View style={styles.MonthSelectContainer}>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === 'LAST MONTH' && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress('LAST MONTH')}
                >
                    <Text style={styles.MonthText}>
                        LAST MONTH
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === 'THIS MONTH' && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress('THIS MONTH')}
                >
                    <Text style={styles.MonthText}>
                        THIS MONTH
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === 'NEXT MONTH' && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress('NEXT MONTH')}
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
                <Text style={styles.buttonText}>View report for this period</Text>
            </TouchableOpacity>

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.detailItem}>
                        <View style={styles.detailTopItem}>
                            <Text style={styles.dateItem}>{item.date}</Text>
                        </View>
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
                )}
            />
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
        margin: 10,
    },
    detailTopItem: {
        padding: 10,
        backgroundColor: '#ffb5a7',
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    detailMainItem: {
        backgroundColor: '#fcd5ce',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    imgItem: {
        width: 30,
        height: 30,
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
    }
})

export default Transaction;