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
  
  const FirstLogin = ({navigation , route}) => {
    const [discipline, setDiscipline] = useState('')
    const [alertType, setAlertType] = useState([])
    const [isSelected, setSelection] = useState(false);
    const alerts = ['number-session-not-attented','statistics-decreasing','near-objectif']
    useEffect(() => {
    });

    const updateCoachProfile = () => {
        const formdata = {
			discipline : discipline,
            alerts : alertType,
            new : false,
        }
        console.log(route.params.id)
        axios.put('http://192.168.1.5:8000/api/coachUpdate/'+route.params.id, formdata)
     
    };
  
    const onChangeDiscipline = (value) => {
      setDiscipline(value);
    };
  
    const onChangeAlerts = (e) => {
      if(alertType.filter(el => el == e).length == 0){
        setAlertType(state => [ e, ...state])}
      else setAlertType(alertType.filter(el => el!=e))
    }
    return (
      <SafeAreaView>
    
   
            <View style={styles.form}>
              
              <TextInput
                value={discipline}
                style={styles.text_input}
                placeholder={"Discipline"}
                onChangeText={onChangeDiscipline}
              />
              {alerts.map((option) =>(
                <CheckBox
                label={option}
                checked={alertType.includes(option)}
                onChange={(e) => {onChangeAlerts(option)}}
              
              />
              )
               )}
            
              

              <TouchableOpacity onPress={updateCoachProfile} style={styles.btnContainer}>
                <Text style={styles.textButton}>Save Infos</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

    );
  };
  
  export default FirstLogin;
  
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
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
  });
  