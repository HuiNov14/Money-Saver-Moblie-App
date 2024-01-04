import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from 'react';
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { FirebaseDB } from '../database/firebaseConfig';
import { AuthContext } from './AuthContext';

export const setImgBasedOnCategory = (category) => {
    switch (category) {
        case 'Food & beverage':
            return require('../assets/restaurant.png');
        case 'Vehicle':
            return require('../assets/car.png');
        case 'Education':
            return require('../assets/graduation-cap.png');
        case 'Technology Stuff':
            return require('../assets/Tech.png');
        case 'Shopping':
            return require('../assets/shopping.png');
        case 'Health':
            return require('../assets/heart-beat.png');
        case 'Home':
            return require('../assets/house.png');
        case 'Gas':
            return require('../assets/gas.png');
        case 'Bills':
            return require('../assets/bill.png');
        case 'Pet':
            return require('../assets/pet.png');
        case 'Gift':
            return require('../assets/gift.png');
        case 'Other':
            return require('../assets/more.png');
        case 'Salary':
            return require('../assets/salary.png');
        case 'Awards':
            return require('../assets/award.png');
        case 'Investments':
            return require('../assets/profits.png');
        case 'Lottery':
            return require('../assets/ticket.png');
        case 'Loan':
            return require('../assets/signing.png');
        case 'Debt':
            return require('../assets/borrow.png');
        default:
            // Giá trị mặc định nếu không có sự khớp
            return null; // hoặc một giá trị ảnh mặc định khác nếu bạn có
    }
};


