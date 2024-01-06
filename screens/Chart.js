import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal, Path } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import IonIcon from "react-native-vector-icons/Ionicons";
import { PChart2 } from '../components/PChart';
import { LineChartComponent } from '../components/LineChart';

function Chart({ navigation, route }) {
    const ExitHandle = () => {
        navigation.goBack();
    }

    const { data, month } = route.params || {};
    const [selectedMonth, setSelectedMonth] = useState('2024/01');

    const updateDataByMonth = (month, allData) => {
        const filteredData = allData.filter(item => item.date.startsWith(month));

        return filteredData;
    };

    const updatedData = updateDataByMonth(month, data);

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <TouchableOpacity onPress={() => ExitHandle()} style={styles.touchable}>
                    <IonIcon name="close" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Statistics of {month}
                </Text>
            </View>
            <View style={styles.MonthSelectContainer}>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === '1' && styles.SelectedMonth,
                    ]}
                    onPress={() => { setSelectedMonth('1') }}
                >
                    <Text style={styles.MonthText}>
                        CATEGORIES
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === '2' && styles.SelectedMonth,
                    ]}
                    onPress={() => { setSelectedMonth('2') }}
                >
                    <Text style={styles.MonthText}>
                        DAY/WEEK
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                {selectedMonth === '2' ? <LineChartComponent data={updatedData} /> : <PChart2 data={updatedData} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcd5ce',
    },
    label: {
        fontSize: 12,
        color: '#ffffff',
        textAlign: 'center',
    },
    screenText: {
        marginTop: 20,
        color: '#003049',
        fontSize: 25,
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
    MonthSelectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        paddingBottom: 10,
        paddingTop: 20,
        borderBottomWidth: 0.5,
        paddingHorizontal: 50,
        borderTopWidth: 0.5,
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
});


export default Chart;