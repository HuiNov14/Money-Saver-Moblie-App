import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../LoginNavigator/AuthContext';

function IncomeCate() {

    const { password, setPassword } = useContext(AuthContext);
    const navigation = useNavigation();
    const ClickedCategories = (text, img) => {
        if (password) {
            setPassword('');
            navigation.goBack()
            navigation.navigate('AddBudget', { textCate: text, imgCate: img });
        }
        else {
            navigation.navigate('AddScreen', { textCate: text, imgCate: img, cateType: 'income' });
        }
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Salary', require('../assets/salary.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/salary.png')}
                />
                <Text style={styles.textCate}>Salary</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Awards', require('../assets/award.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/award.png')}
                />
                <Text style={styles.textCate}>Awards</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Investments', require('../assets/profits.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/profits.png')}
                />
                <Text style={styles.textCate}>Investments</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => ClickedCategories('Lottery', require('../assets/ticket.png'))}
            >
                <Image
                    style={styles.imageCate}
                    source={require('../assets/ticket.png')}
                />
                <Text style={styles.textCate}>Lottery</Text>
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

export default IncomeCate;