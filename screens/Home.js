import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { FirebaseDB } from '../database/firebaseConfig';
import { getFirestore, collection, addDoc, doc, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../LoginNavigator/AuthContext';
import { PChart } from '../components/PChart';
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

function Home({ navigation }) {

  //get data
  const [userData, setUserData] = useState([])
  const [total, setTotal] = useState(0)
  const { email, setEmail } = useContext(AuthContext);
  const userId = email;

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

  //Switch to transaction screen
  const seeAllHandle = () => {
    navigation.navigate('Transaction')
  }
  //Switch to report screen
  const seeReport = () => {
    navigation.navigate('Chart', { data: userData, month: startDate })
  }
  //Switch to budget screen
  const seeBudget = () => {
    navigation.navigate('Budget')
  }

  //Switch to notification screen
  const onPressHandle = () => {
    navigation.navigate('Notifications');
  }

  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM');
  const [selectedMonth, setSelectedMonth] = useState(startDate);

  //Lấy dữ liệu lúc vừa vào
  useEffect(() => {
    getUserDataFromFirestore(userId);
  }, [userId, selectedMonth]);

  useEffect(() => {
    navigation.navigate('Add');
  }, [userId]);

  //Cập nhật dữ liệu theo tháng
  const updateDataByMonth = (month, allData) => {
    const filteredData = allData.filter(item => item.date.startsWith(month));

    return filteredData;
  };

  const updatedData = updateDataByMonth('2024/01', userData);

  return (
    <View style={styles.container}>
      <Text style={styles.TotalCash}>
        {total}  đ
      </Text>
      <Text style={styles.TotalCashText}>
        Total Cash
      </Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onPressHandle}
      >
        <Image
          style={styles.imageStyle2}
          source={require('../assets/bell.png')}
        />
      </TouchableOpacity>

      <View style={styles.boxContainer1}>
        <View style={styles.topBox1}>
          <Text>My wallets</Text>
          <TouchableOpacity
            onPress={seeAllHandle}
          >
            <Text>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainBox1}>
          <View style={styles.row}>
            <Image
              style={styles.TotalImage}
              source={require('../assets/wallet.png')}
            />
            <Text style={styles.TotalText}>
              Cash
            </Text>
          </View>
          <Text style={styles.totalText2}>{total} đ</Text>
        </View>
      </View>

      <View style={styles.topBox2}>
        <Text>Spending Report</Text>
        <TouchableOpacity
          onPress={seeReport}
        >
          <Text>See Reports</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxContainer2}>
        <View style={styles.MonthSelectContainer}>
          <TouchableOpacity
            style={[
              styles.MonthTouch,
              selectedMonth === '1' && styles.SelectedMonth,
            ]}
            onPress={() => { setSelectedMonth('1') }}
          >
            <Text style={styles.MonthText}>
              ALL TIME
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.MonthTouch,
              selectedMonth === startDate && styles.SelectedMonth,
            ]}
            onPress={() => { setSelectedMonth(startDate) }}
          >
            <Text style={styles.MonthText}>
              THIS MONTH
            </Text>
          </TouchableOpacity>
        </View>
        {selectedMonth === '1' ? <PChart data={userData} /> : <PChart data={updatedData} />}
        <TouchableOpacity
          style={styles.buttonContainer2}
          onPress={seeBudget}
        >
          <Image
            style={styles.imageStyle}
            source={require('../assets/budgeting.png')}
          />
          <Text style={styles.buttonText}>View Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcd5ce',
  },
  background: {
    // position: 'absolute',
    backgroundColor: '#ffb5a7',
    top: 0,
    left: 0,
    width: '100%',
    height: 90,
  },
  headerText: {
    top: 13,
    color: 'black',
    left: 66,
    fontSize: 21,
    fontWeight: 'bold',
  },
  touchable: {
    top: 45,
    left: 12,
    width: 30,
  },
  imgBackground: {
    alignItems: 'center',
    marginTop: 200,
  },
  TotalCash: {
    marginTop: 50,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  TotalCashText: {
    marginTop: 5,
    left: 20,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: 30,
    height: 30,
    marginTop: 60,
    right: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  imageStyle2: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignSelf: 'center',
  },
  boxContainer1: {
    borderWidth: 0.5,
    height: 100,
    width: 330,
    marginTop: 50,
    marginHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#ffb5a7'
  },
  boxContainer2: {
    borderWidth: 0.5,
    height: 450,
    width: 330,
    marginHorizontal: 30,
    borderRadius: 20,
    backgroundColor: '#ffb5a7'
  },
  topBox2: {
    marginTop: 50,
    marginBottom: 10,
    flexDirection: 'row',
    marginHorizontal: 40,
    justifyContent: 'space-between'
  },
  topBox1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  mainBox1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  TotalImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  totalText2: {
    right: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  TotalText: {
    fontSize: 15,
  },
  MonthSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
    paddingBottom: 10,
    paddingTop: 10,
    marginHorizontal: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#fcd5ce',
    paddingHorizontal: 35,
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
  buttonContainer2: {
    flexDirection: 'row',
    width: 250,
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fcd5ce',
    borderRadius: 10,
    marginTop: 80,
    marginBottom: 20,
    borderTopWidth: 1,
    // paddingTop: 10,
    // borderWidth: 0.5,
  },
  imageStyle: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 17,
  },
});

export default Home;