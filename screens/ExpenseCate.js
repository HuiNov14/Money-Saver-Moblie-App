import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ExpenseCate() {

    const navigation = useNavigation();
    const ClickedCategories = (text, img) => {
        navigation.navigate('AddScreen', {textCate: text, imgCate: img});
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Food & beverage', require('../assets/restaurant.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/restaurant.png')}
                />
                <Text style={styles.textCate}>Food & beverage</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Vehicle', require('../assets/car.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/car.png')}
                />
                <Text style={styles.textCate}>Vehicle</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Education', require('../assets/graduation-cap.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/graduation-cap.png')}
                />
                <Text style={styles.textCate}>Education</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Technology Stuff', require('../assets/Tech.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/Tech.png')}
                />
                <Text style={styles.textCate}>Technology Stuff</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Shopping', require('../assets/shopping.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/shopping.png')}
                />
                <Text style={styles.textCate}>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Health', require('../assets/heart-beat.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/heart-beat.png')}
                />
                <Text style={styles.textCate}>Health</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Home', require('../assets/house.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/house.png')}
                />
                <Text style={styles.textCate}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Gas', require('../assets/gas.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/gas.png')}
                />
                <Text style={styles.textCate}>Gas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Bills', require('../assets/bill.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/bill.png')}
                />
                <Text style={styles.textCate}>Bills</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Pet', require('../assets/pet.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/pet.png')}
                />
                <Text style={styles.textCate}>Pet</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Gift', require('../assets/gift.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/gift.png')}
                />
                <Text style={styles.textCate}>Gift</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Other', require('../assets/more.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/more.png')}
                />
                <Text style={styles.textCate}>Other</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcd5ce',
    },
    screenText: {
        color: '#000',
    },
    ItemContainer: {
        flexDirection: 'row',
        // backgroundColor: 'white',
        alignItems: 'center',
        width: '100%', 
        padding: 10,
        // borderBottomWidth: 0.5,
        borderColor: '#003049',
        marginBottom: 5,
    },
    imageCate: {
        width: 35,
        height: 35,
        marginRight: 20, 
        marginLeft: 10,
    },
    textCate: {
        color: '#003049',
        fontSize: 20,
    },
});

export default ExpenseCate;