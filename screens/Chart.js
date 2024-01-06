import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal, Path } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import IonIcon from "react-native-vector-icons/Ionicons";
import { PieChart, LineChart } from 'react-native-chart-kit';

const PChart = ({ data }) => {

    // Tính tổng giá trị cho mỗi loại categories
    const categoriesTotal = {};
    data.forEach(item => {
        const categoryName = item.categories;
        const price = parseFloat(item.price);
        if (categoriesTotal[categoryName]) {
            categoriesTotal[categoryName] += price;
        } else {
            categoriesTotal[categoryName] = price;
        }
    });

    const chartColors = [
        '#012a4a', '#013a63', '#01497c', '#014f86', '#2a6f97',
        '#2c7da0', '#468faf', '#61a5c2', '#89c2d9', '#a9d6e5',
        '#1a759f', '#168aad', '#34a0a4', '#52b69a', '#76c893',
        '#99d98c', '#b5e48c', '#d9ed92', '#008000', '#004b23',
    ];


    const chartData = Object.keys(categoriesTotal).map((categoryName, index) => ({
        name: categoryName,
        value: categoriesTotal[categoryName],
        color: chartColors[index % chartColors.length],
    }));

    return (
        <View style={styles.chartContainer}>
            <PieChart
                data={chartData}
                width={350}
                height={250}
                chartConfig={{
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientTo: '#08130D',
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                }}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="100"
                hasLegend={false}
            />
            <View style={styles.legendContainer}>
                {chartData.map((data, index) => (
                    <View key={index} style={styles.legendItem}>
                        <Text style={[styles.legendColor, { backgroundColor: data.color }]} />
                        <Text style={styles.legendText}>{data.name}: {parseFloat(data.value).toLocaleString()}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const extractDayFromDateString = dateString => {
    const parts = dateString.split('/');
    return parts.length === 3 ? parts[2] : null;
};

const LineChartComponent = ({ data }) => {

    const preprocessData = rawData => {
        const aggregatedData = {};

        rawData.forEach(item => {
            const day = extractDayFromDateString(item.date);
            const price = parseFloat(item.price);

            if (day) {
                if (aggregatedData[day]) {
                    // Kiểm tra nếu là expense thì trừ, ngược lại cộng
                    aggregatedData[day] += item.typeCate === 'expense' ? -price : price;
                } else {
                    // Kiểm tra nếu là expense thì trừ, ngược lại cộng
                    aggregatedData[day] = item.typeCate === 'expense' ? -price : price;
                }
            }
        });

        return Object.keys(aggregatedData)
            .map(day => ({
                date: day,
                totalPrice: aggregatedData[day],
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const processedData = preprocessData(data);

    const chartData = {
        labels: processedData.map(item => item.date),
        datasets: [
            {
                data: processedData.map(item => item.totalPrice),
            },
        ],
    };

    return (
        <View>

            <View style={styles.lineChartContainer}>
                <LineChart
                    data={chartData}
                    width={380}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#012a4a',
                        backgroundGradientFrom: '#012a4a',
                        backgroundGradientTo: '#a9d6e5',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                bezier
                />
                <Text style={styles.lineText}>Total Price by Date</Text>
            </View>
        </View>
    );
};


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
                {selectedMonth === '2' ? <LineChartComponent data={updatedData} /> : <PChart data={updatedData} />}
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
    chartContainer: {
        marginTop: 50,
    },
    lineChartContainer: {
        marginLeft: 5,
        marginTop: 100,
    },
    lineText: {
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 12,
        color: '#012a4a',
        fontWeight: 'bold'
    },
    legendColor: {
        width: 50,
        marginRight: 10,
    },
    legendItem: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 30,
    },
    legendContainer: {
        borderWidth: 0.7,
        marginTop: 20,
        marginHorizontal: 10,
        paddingBottom: 20,
        backgroundColor: '#edf6f9'
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