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
    Button,
    Platform,
  } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";


const Signup = ({navigation}) => {

  const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
  const [birthdate, setBirthdate] = useState()
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  
 

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChangeFirstname = (value) => {
    setFirstname(value);
  };
  const onChangeLastname = (value) => {
    setLastname(value);
  };
  const onChangeBirthdate = (value) => {
    setBirthdate(value);
  };
  async function SwitchLogin(event){
    navigation.navigate('Login')
  }
	async function signupCoach() {
        const formdata = {

			
          firstname: firstname,
          lastname : lastname,
          birthDate : birthdate,
          new: true,
 }
		await axios
			.post('http://192.168.64.243:8000/api/signup', formdata)

	}
	return (
        <SafeAreaView>

            <View style={styles.header_container}>

              <Text style={styles.text}>Firstname</Text>
              <TextInput
              value={firstname}
              style={styles.text_input}
              placeholder="firstname"
              onChangeText={onChangeFirstname}
              />

              <Text style={styles.text}>Lastname</Text>
              <TextInput
              value={lastname}
              style={styles.text_input}
              placeholder="Lastname"
              onChangeText={onChangeLastname}
              />
              <Text style={styles.text}>Birthdate</Text>
              <TextInput
              value={birthdate}
              style={styles.text_input}
              placeholder="birthdate"
              onChangeText={onChangeBirthdate}
              />
                
                
                
                <View style={styles.header_container}>
                  <TouchableOpacity
                    onPress={signupCoach}
                    style={styles.btnNewContainer}
                  >
                  <Text style={styles.textButton}>Signup</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>I already have an account!</Text>

              <View style={styles.header_container}>
                  <TouchableOpacity
                    onPress={SwitchLogin}
                    style={styles.btnNewContainer}
                  >
                  <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
			)
}

export default Signup

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
  