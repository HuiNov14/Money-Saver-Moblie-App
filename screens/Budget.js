import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import IonIcon from "react-native-vector-icons/Ionicons"; import { getFirestore, collection, addDoc, doc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../database/firebaseConfig';
import { AuthContext } from '../LoginNavigator/AuthContext';
import { setImgBasedOnCategory } from '../components/setImg';
import DatePicker from "react-native-modern-datepicker"
import { addUserDataToFirestore2, deleteDocumentFromFirestore2 } from '../components/FireBaseHandle';
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { decrementMonth, incrementMonth } from '../components/MonthChange';

const Budget = ({ navigation, route }) => {

    const [userData, setUserData] = useState([])
    const { email } = useContext(AuthContext);
    const userId = email;

    //Lấy dữ liệu
    const getUserDataFromFirestore = async (userId) => {
        const userDocRef = doc(FirebaseDB, 'userAccounts', userId);
        const budgetsCollectionRef = collection(userDocRef, 'Budgets');

        try {
            const querySnapshot = await getDocs(budgetsCollectionRef);

            const userData2 = []

            querySnapshot.forEach((doc) => {
                userData2.push({ id: doc.id, ...doc.data() });
            });

            console.log('Lấy dữ liệu budget thành công');
            setUserData(userData2)

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu budget từ Firestore:', error);
            return [];
        }
    };

    //Xử lý ngày tháng
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY');
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

    //Xóa dữ liệu 
    const { dataProp, deleteId } = route.params || {};
    useEffect(() => {
        const fetchData = async () => {
            if (deleteId) {
                await deleteDocumentFromFirestore2(userId, deleteId)
                getUserDataFromFirestore(userId);
            }
        };

        fetchData();
    }, [deleteId]);

    //Lấy dữ liệu lúc mới vào
    useEffect(() => {
        getUserDataFromFirestore(userId);
    }, [userId]);

    //Khi data mới được thêm vào thì thêm data vào firebase
    useEffect(() => {
        const fetchData = async () => {
            if (dataProp && dataProp.price) {
                await addUserDataToFirestore2(userId, dataProp);
                getUserDataFromFirestore(userId);
            }
        };

        fetchData();
    }, [dataProp]);

    //Switch sang new budget
    const AddBudgetHandle = () => {
        navigation.navigate('AddBudget');
    }

    //Switch sang Edit budget
    const SwToEdit = (itemProp) => {
        navigation.navigate('AddBudget', { itemProp: itemProp });
    }

    //Update data từ userData (thêm img tương ứng)
    const updatedUserData = userData.map(item => {
        const img = setImgBasedOnCategory(item.categories);
        return { ...item, img };
    });

    return (
        <View style={styles.container} >
            <View style={styles.background}>
                <View style={styles.TotalContainer}>
                    <Image
                        style={styles.TotalImage}
                        source={require('../assets/budgeting.png')}
                    />
                    <Text style={styles.TotalText}>
                        Budget
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
                        selectedMonth === startDate && styles.SelectedMonth,
                    ]}
                    onPress={() => { setSelectedMonth(startDate) }}
                >
                    <Text style={styles.MonthText}>
                        RUNNING
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.MonthTouch,
                        selectedMonth === (startDate-1) && styles.SelectedMonth,
                    ]}
                    onPress={() => { setSelectedMonth(startDate-1) }}
                >
                    <Text style={styles.MonthText}>
                        FINISHED
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={AddBudgetHandle}
            >
                <Image
                    style={styles.imageStyle}
                    source={require('../assets/budget.png')}
                />
                <Text style={styles.buttonText}>New budget</Text>
            </TouchableOpacity>

            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={updatedUserData.filter(item => item.endDate.startsWith(selectedMonth))}
                renderItem={({ item }) => (
                    <>
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                onPress={() => SwToEdit(item)}
                                activeOpacity={0.9}
                            >
                                <View style={styles.budgetContainer}>
                                    <Text style={styles.monthBudget}>This month</Text>
                                    <Text style={styles.dateBudget}>{item.startDate}-{item.endDate}</Text>
                                    <View style={styles.detailItem}>
                                        <View style={styles.detailMainItem}>
                                            <View style={styles.CateContainer}>
                                                <Image
                                                    style={styles.imgItem}
                                                    source={item.img}
                                                />
                                                <View style={styles.CateContainer1}>
                                                    <Text style={styles.CateItem}>{item.categories}</Text>
                                                    <Text style={styles.NoteItem}>{parseFloat(item.totalCost).toLocaleString()}</Text>
                                                </View>
                                            </View>

                                            <Text style={styles.PriceItem}>{parseFloat(item.price).toLocaleString()}</Text>
                                        </View>
                                        <View style={styles.loadingContainer}>
                                            <View style={[styles.loadingBar, { width: item.totalCost ? ((parseFloat(item.totalCost) / parseFloat(item.price)) * 369) : 0, backgroundColor: '#ffb5a7' }]} />
                                            <View style={[styles.remainingBar, { width: parseFloat(item.price) }]} />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
    background: {
        // position: 'absolute',
        backgroundColor: '#fcd5ce',
        marginTop: 0,
        width: '100%',
        height: 120,
        borderColor: '#003049',
        alignItems: 'center',
        backgroundColor: '#ffb5a7',
        borderBottomWidth: 0.5,
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
        marginTop: 45,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TotalImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    TotalText: {
        fontSize: 25,
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
    buttonContainer: {
        flexDirection: 'row',
        width: 250,
        height: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffb5a7',
        borderRadius: 15,
        marginTop: 50,
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
    detailMainItem: {
        backgroundColor: '#fcd5ce',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        margin: 5,
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
        color: 'green'
    },
    dateItem: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    CateItem: {
        fontWeight: 'bold',
    },
    NoteItem: {
        color: 'red'
    },
    budgetContainer: {
        marginTop: 30,
    },
    dateBudget: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    monthBudget: {
        fontSize: 15,
        fontWeight: '200',
        marginLeft: 10,
    },
    loadingContainer: {
        height: 15,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        borderWidth: 0.5,
        width: 370,
    },
    loadingBar: {
        height: '100%',
    },
    remainingBar: {
        height: '100%',
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

export default Budget;