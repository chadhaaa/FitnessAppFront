import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Switch,
  // Picker,
} from "react-native";
import CheckBox from 'react-native-checkbox';
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Payment = () =>{
	const [planChoosed, setPlanChoosed] = useState('')
  const [id, setId] = useState('')
    const plans = ['free','basic','prenium']

   
    useEffect(() => {
      AsyncStorage.getItem('user_id').then(
        (value) =>
          setId(value),
      );
      AsyncStorage.getItem('user_plan').then(
        (value) =>
          setPlanChoosed(value),
      );
    },[]);

    const ChoosePayPlan = () => {
        const formdata = {
			    plan : planChoosed,
        }
        axios.put('http://192.168.1.5:8000/api/coachUpdate/'+id, formdata).then(
          alert('Payment done'),
          AsyncStorage.setItem('user_plan', planChoosed)

        )
     
    };
  
    const onChangePlanChoosed = (value) => {

        setPlanChoosed(value);
    };
    return (
      <SafeAreaView>
            <View style={styles.form}>
              
            
              {plans.map((option) =>(
                <CheckBox
                label={option}
                checked={planChoosed == option}
                onChange={(e) => {onChangePlanChoosed(option)}}
              />
              )
               )}
            
              

              <TouchableOpacity onPress={ChoosePayPlan} style={styles.btnContainer}>
                <Text style={styles.textButton}>Pay</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

    );


}


export default Payment

const styles = StyleSheet.create({
    header_container: {
      padding: 15,
      backgroundColor: "#eeeeee",
    },
    txt_main: {
      fontSize: 22,
      fontWeight: "bold",
    },
    item_course: {
      padding: 15,
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    txt_item: {
      fontSize: 14,
      marginTop: 5,
    },
    btnContainer: {
      padding: 30,
    },
    txt_name: {
      fontSize: 18,
      marginTop: 5,
      fontWeight: "bold",
    },
    txt_del: {
      fontSize: 14,
      marginTop: 5,
      color: "red",
      fontWeight: "bold",
    },
    txt_edit: {
      fontSize: 14,
      marginTop: 5,
      color: "blue",
      fontWeight: "bold",
    },
    form: {
      padding: 15,
      backgroundColor: "#e3e3e3",
      marginTop: 20,
    },
    text_input: {
      padding: 10,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 10,
      marginTop: 10,
    },
    textButton: {
      marginTop: 10,
      fontSize: 22,
      color: "green",
      textAlign: "center",
    },
    txtClose: {
      marginTop: 10,
      fontSize: 22,
      color: "red",
    },
    datePicker: {
      width: 320,
      height: 260,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
  });
  