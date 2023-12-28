import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function DebtCate() {

    const navigation = useNavigation();
    const ClickedCategories = (text, img) => {
        navigation.navigate('AddScreen', {textCate: text, imgCate: img});
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Loan', require('../assets/signing.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/signing.png')}
                />
                <Text style={styles.textCate}>Loan</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Debt', require('../assets/borrow.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/borrow.png')}
                />
                <Text style={styles.textCate}>Debt</Text>
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

export default DebtCate;