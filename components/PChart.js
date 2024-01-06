import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { PieChart, LineChart } from 'react-native-chart-kit';

export const PChart = ({ data }) => {

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
        <View style={styles.chartContainer1}>
            <PieChart
                data={chartData}
                width={300}
                height={200}
                chartConfig={{
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientTo: '#08130D',
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                }}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="20"
                hasLegend={true}
            />
        </View>
    );
};

export const PChart2 = ({ data }) => {

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