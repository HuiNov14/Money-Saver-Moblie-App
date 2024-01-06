import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { PieChart, LineChart } from 'react-native-chart-kit';

export const LineChartComponent = ({ data }) => {

    const extractDayFromDateString = dateString => {
        const parts = dateString.split('/');
        return parts.length === 3 ? parts[2] : null;
    };

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcd5ce',
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
});