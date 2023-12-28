import {View, Text , StyleSheet} from 'react-native'
import React from 'react';

const Budget = () => {
    return (
        <View style= {styles.container} >
        <Text style={styles.screenText}>
        Budget Screen
        </Text>

    </View>
    );
};
const styles = StyleSheet.create ({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fcd5ce',
    },
    screenText: {
        color:'#000',
    },
})

export default Budget;