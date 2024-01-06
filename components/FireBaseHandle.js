import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from 'react';
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../database/firebaseConfig';

//Thêm dữ liệu transactions
export const addUserDataToFirestore = async (userId, dataProp) => {
    const userDocRef = doc(FirebaseDB, 'userAccounts', userId);

    try {
        // Tạo hoặc cập nhật tài liệu người dùng
        await setDoc(userDocRef, { email: userId, totalCash: 0 });

        // Thêm dữ liệu vào subcollection 'transactions'
        const transactionsCollectionRef = collection(userDocRef, 'transactions');

        const { img, ...rest } = dataProp;
        await addDoc(transactionsCollectionRef, rest);

        console.log('Dữ liệu đã được thêm vào Firestore thành công.');
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu vào Firestore:', error);
    }
};

//Xóa dữ liệu transactions
export const deleteDocumentFromFirestore = async (userId, documentId) => {
    const userDocRef = doc(FirebaseDB, 'userAccounts', userId);
    const transactionsCollectionRef = collection(userDocRef, 'transactions');
    const documentRef = doc(transactionsCollectionRef, documentId);

    try {
        await deleteDoc(documentRef);
        console.log('Dữ liệu đã được xóa thành công.');
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
    }
};

//Thêm dữ liệu budget 
export const addUserDataToFirestore2 = async (userId, dataProp) => {
    const userDocRef = doc(FirebaseDB, 'userAccounts', userId);
    const transactionsCollectionRef = collection(userDocRef, 'transactions');

    try {
        await setDoc(userDocRef, { email: userId });
        const budgetsCollectionRef = collection(userDocRef, 'Budgets');

        const { img, ...rest } = dataProp;
        await addDoc(budgetsCollectionRef, rest);

        console.log('Dữ liệu budget đã được thêm vào Firestore thành công.');

        //Thêm totalCost
        const querySnapshot = await getDocs(transactionsCollectionRef);

        const userData2 = [];

        querySnapshot.forEach((doc) => {
            userData2.push({ id: doc.id, ...doc.data() });
        });

        const budgetsSnapshot = await getDocs(budgetsCollectionRef);
        const budgetsData = [];

        budgetsSnapshot.forEach((doc) => {
            budgetsData.push({ id: doc.id, ...doc.data() });
        });

        budgetsData.forEach(async (budget) => {
            const { startDate, endDate, categories } = budget;

            const transactionsInDateRange = userData2.filter((transaction) => {
                const transactionDate = transaction.date;
                return transactionDate >= startDate && transactionDate <= endDate;
            });

            const totalCost = transactionsInDateRange.reduce((sum, transaction) => {
                return sum + (transaction.categories === categories ? +transaction.price : +0);
            }, 0);

            await updateDoc(doc(budgetsCollectionRef, budget.id), { totalCost });
        });
        console.log('Thêm total cost thành công');
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu budget vào Firestore:', error);
    }
};

//Xóa dữ liệu trên firebase
export const deleteDocumentFromFirestore2 = async (userId, documentId) => {
    const userDocRef = doc(FirebaseDB, 'userAccounts', userId);
    const budgetsCollectionRef = collection(userDocRef, 'Budgets');
    const documentRef = doc(budgetsCollectionRef, documentId);

    try {
        await deleteDoc(documentRef);
        console.log('Dữ liệu đã được xóa thành công.');
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
    }
};