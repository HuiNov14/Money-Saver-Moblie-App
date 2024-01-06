import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from 'react';
import DatePicker from "react-native-modern-datepicker"
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../database/firebaseConfig';
import { AuthContext } from '../LoginNavigator/AuthContext';
import { setImgBasedOnCategory } from '../components/setImg';
import { addUserDataToFirestore, deleteDocumentFromFirestore } from '../components/FireBaseHandle';
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { decrementMonth, incrementMonth } from '../components/MonthChange';

const Transaction = ({ navigation, route }) => {

    const [userData, setUserData] = useState([])
    const { email, setEmail } = useContext(AuthContext);
    const userId = email;

    //Hàm lấy dữ liệu
    const getUserDataFromFirestore = async (userId) => {
        const userDocRef = doc(FirebaseDB, 'userAccounts', userId);
        const transactionsCollectionRef = collection(userDocRef, 'transactions');

        try {
            const querySnapshot = await getDocs(transactionsCollectionRef);

            const userData2 = []
            let totalCash = 0

            querySnapshot.forEach((doc) => {
                userData2.push({ id: doc.id, ...doc.data() });
                const numericPrice = parseFloat(doc.data().price);
                const sign = doc.data().typeCate === 'income' ? 1 : -1;
                totalCash += sign * numericPrice;
            });

            await updateDoc(userDocRef, { totalCash });
            console.log('Lấy dữ liệu thành công');
            setUserData(userData2)
            setTotal(totalCash.toLocaleString('en-US'))

            return userData2;
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu từ Firestore:', error);
            return [];
        }
    };

    //Lấy dữ liệu lúc vừa vào
    useEffect(() => {
        getUserDataFromFirestore(userId);
    }, [userId]);

    //Xóa Dữ liệu
    const { dataProp, deleteId } = route.params || {};

    useEffect(() => {
        const fetchData = async () => {
            if (deleteId) {
                await deleteDocumentFromFirestore(userId, deleteId);
                getUserDataFromFirestore(userId);
            }
        };

        fetchData();
    }, [deleteId]);

    //Thêm dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            if (dataProp && dataProp.price) {
                await addUserDataToFirestore(userId, dataProp);
                getUserDataFromFirestore(userId);
            }
        };

        fetchData();
    }, [dataProp]);

    //Xử lý ngày tháng
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM');
    const [selectedMonth, setSelectedMonth] = useState(startDate);

    const handleMonthPress = (month) => {
        setSelectedMonth(month)
    }
    function handleMonthChange(propDate) {
        month = propDate.replace(/\s/g, '/');
        setDate(month)
    }
    function SelectMonthPress() {
        setOpen(!open)
        setSelectedMonth(date)
    }

    //Switch to Edit Screen
    const SwToEdit = (itemProp) => {
        navigation.navigate('AddScreen', { itemProp: itemProp });
    }

    //Switch to Chart Screen
    const viewChart = () => {
        navigation.navigate('Chart', { data: userData, month: selectedMonth });
    }

    //Thêm img vào userData
    const updatedUserData = userData.map(item => {
        const img = setImgBasedOnCategory(item.categories);
        return { ...item, img };
    });

    //Group data theo date
    const groupedData = updatedUserData.reduce((acc, item) => {
        const existingGroup = acc.find((group) => group.date === item.date);

        if (existingGroup) {
            existingGroup.items.push(item);
        } else {
            acc.push({ date: item.date, items: [item] });
        }

        return acc;
    }, []);

    groupedData.sort((a, b) => {
        const convertToDate = (dateString) => {
            const [year, month, day] = dateString.split('/');
            return new Date(year, month - 1, day);
        };
        return convertToDate(b.date) - convertToDate(a.date);
    });

    //Cập nhật tổng inflow, outflow, total của từng tháng
    const [total, setTotal] = useState(0)
    const [totalMonth, setTotalMonth] = useState(0)
    const [inflow, setInflow] = useState(0)
    const [Outflow, setOutFlow] = useState(0)

    useEffect(() => {
        const sum1 = groupedData
            .filter((group) => group.date.startsWith(selectedMonth))
            .reduce((acc, group) => {
                return acc + group.items.reduce((sum1, item) => {
                    const price = parseFloat(item.price);
                    return item.typeCate === 'income' ? sum1 + price : sum1 - 0;
                }, 0);
            }, 0);
        const sum2 = groupedData
            .filter((group) => group.date.startsWith(selectedMonth))
            .reduce((acc, group) => {
                return acc + group.items.reduce((sum2, item) => {
                    const price = parseFloat(item.price);
                    return item.typeCate === 'expense' ? sum2 + price : sum2 - 0;
                }, 0);
            }, 0);
        const sum = sum1 - sum2;
        setTotalMonth(sum.toLocaleString('en-US'));
        setInflow(sum1.toLocaleString('en-US'))
        setOutFlow(sum2.toLocaleString('en-US'))
    }, [groupedData, selectedMonth]);

    //Display
    return (
        <View style={styles.container} >
            <View style={styles.background}>
                <Text style={styles.headerText}>
                    Balance
                </Text>
                <Text style={styles.headerText2}>
                    {total} đ
                </Text>
                <View style={styles.TotalContainer}>
                    <Image
                        style={styles.TotalImage}
                        source={require('../assets/wallet.png')}
                    />
                    <Text style={styles.TotalText}>
                        Cash
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer2}
                    onPress={SelectMonthPress}
                >
                    <Image
                        style={styles.imageStyle2}
                        source={require('../assets/filter.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.MonthSelectContainer}>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === (decrementMonth(startDate)) && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress(decrementMonth(startDate))}
                >
                    <Text style={styles.MonthText}>
                        LAST MONTH
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === startDate && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress(startDate)}
                >
                    <Text style={styles.MonthText}>
                        THIS MONTH
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === (incrementMonth(startDate)) && styles.SelectedMonth,
                    ]}
                    onPress={() => handleMonthPress(incrementMonth(startDate))}
                >
                    <Text style={styles.MonthText}>
                        NEXT MONTH
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.reviewContainer}>
                <View style={styles.reviewLine}>
                    <Text style={styles.reviewText}>Inflow:</Text>
                    <Text style={styles.reviewText}>{inflow}</Text>
                </View>
                <View style={styles.reviewLine}>
                    <Text style={styles.reviewText}>Outflow:</Text>
                    <Text style={styles.reviewText}>{Outflow}</Text>
                </View>
                <View style={styles.Line}></View>
                <View style={styles.reviewLine}>
                    <Text style={styles.reviewText}></Text>
                    <Text style={styles.reviewText}>{totalMonth}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={viewChart}
            >
                <Image
                    style={styles.imageStyle}
                    source={require('../assets/pie-chart.png')}
                />
                <Text style={styles.buttonText}>View report for {selectedMonth}</Text>
            </TouchableOpacity>

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={groupedData.filter(group => group.date.startsWith(selectedMonth))}
                renderItem={({ item: group }) => (
                    <>
                        <View style={styles.itemContainer}>
                            <View style={styles.detailTopItem}>
                                <Text style={styles.dateItem}>{group.date}</Text>
                            </View>
                            {group.items.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => SwToEdit(item)}
                                    activeOpacity={0.9}
                                >
                                    <View style={styles.detailItem}>
                                        <View style={styles.detailMainItem}>
                                            <View style={styles.CateContainer}>
                                                <Image
                                                    style={styles.imgItem}
                                                    source={item.img}
                                                />
                                                <View style={styles.CateContainer1}>
                                                    <Text style={styles.CateItem}>{item.categories}</Text>
                                                    <Text style={styles.NoteItem}>{item.note}</Text>
                                                </View>
                                            </View>

                                            <Text style={
                                                item.typeCate === 'expense' ? styles.PriceItem : styles.PriceItem2
                                            }>{parseFloat(item.price).toLocaleString()}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            <View style={styles.detailBotItem}></View>
                        </View>
                    </>
                )}
            />
            <Modal
                animationType='slide'
                transparent={true}
                visible={open}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <DatePicker
                            mode='monthYear'
                            onMonthYearChange={handleMonthChange}
                        />

                        <TouchableOpacity
                            style={[styles.DateClose]}
                            onPress={SelectMonthPress}
                        >
                            <Text style={styles.TextClose}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fcd5ce',
    },
    screenText: {
        color: '#003049',
    },
    background: {
        // position: 'absolute',
        backgroundColor: '#fcd5ce',
        top: 0,
        left: 0,
        width: '100%',
        height: 150,
        borderBottomWidth: 0.5,
        borderColor: '#003049',
        alignItems: 'center',
    },
    headerText: {
        marginTop: 30,
        color: '#003049',
        fontSize: 18,
        fontWeight: '100',
    },
    headerText2: {
        color: '#003049',
        fontSize: 21,
        fontWeight: 'bold',
    },
    touchable: {
        top: 45,
        left: 12,
        width: 30,
    },
    buttonContainer2: {
        flexDirection: 'row',
        position: 'absolute',
        width: 20,
        height: 20,
        marginTop: 60,
        right: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    imageStyle2: {
        width: 25,
        height: 25,
        marginRight: 0,
        alignSelf: 'center',
    },
    TotalContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TotalImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    TotalText: {
        fontSize: 15,
    },
    MonthSelectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,

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
    reviewContainer: {
        padding: 10,
        paddingTop: 20,
        marginTop: 10,
        borderTopWidth: 0.5,
    },
    reviewLine: {
        flexDirection: 'row',
        paddingBottom: 5,
        justifyContent: 'space-between',
    },
    reviewText: {
        fontSize: 16,
    },
    Line: {
        width: 100,
        height: 1,
        backgroundColor: 'black',
        alignSelf: 'flex-end'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 250,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffb5a7',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 20,
    },
    imageStyle: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    buttonText: {
        fontWeight: '200',
    },
    detailItem: {

    },
    itemContainer: {
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.5,
        elevation: 5,
        borderRadius: 1,
        marginBottom: 40,
    },
    detailTopItem: {
        marginHorizontal: 5,
        padding: 10,
        backgroundColor: '#ffb5a7',
    },
    detailMainItem: {
        backgroundColor: '#fcd5ce',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        margin: 5,
    },
    detailBotItem: {

    },
    imgItem: {
        width: 27,
        height: 27,
        marginRight: 15,
        marginLeft: 10,
        alignSelf: 'center',
    },
    CateContainer: {
        flexDirection: 'row'
    },
    PriceItem: {
        marginRight: 10,
        alignSelf: 'center',
        color: 'red'
    },
    PriceItem2: {
        marginRight: 10,
        alignSelf: 'center',
        color: 'green'
    },
    dateItem: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    CateItem: {
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#f0e6ef',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    DateClose: {
        borderWidth: 0.5,
        alignItems: 'center',
        marginTop: 15,
        padding: 5,
        width: 120,
        height: 30,
        backgroundColor: '#7bdff2',
        borderRadius: 5,
    },
    TextClose: {
        color: 'white',
        fontSize: 15,
    },
})

export default Transaction;