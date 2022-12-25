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

const Login = ({navigation}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };
  async function SwitchSignup(event){
    navigation.navigate('Signup')
  }
	async function loginUser(event) {
		const body = {
			email: email,
			password: password,
		}
		await axios
			.post('http://10.1.0.130:8000/api/login', body)
			.then((response) => {
				if (response.data.user && !response.data.user._doc.new) {
					console.log(response.data.user._doc.new)
					alert(response.data.user)
          alert(`Hello ${response.data.user._doc.firstName} ${response.data.user._doc.lastName}`)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          })
					
				}
        else if (response.data.user && response.data.user._doc.new) {
          navigation.navigate('First Login' , {id : response.data.user._doc._id})
        }

			})
			.catch((err) => {
        alert('1')
				//alert(err.response.data.message)
			})

      const onChangeEmail = (value) => {
        setEmail(value);
      };
      const onChangePassword = (value) => {
        setPassword(value);
      };
	}
	return (
        <SafeAreaView>

            <View style={styles.header_container}>
                <TextInput
                value={email}
                style={styles.text_input}
                placeholder="Email"
                onChangeText={onChangeEmail}
                />
                <TextInput
                value={password}
                style={styles.text_input}
                placeholder="Password"
                onChangeText={onChangePassword}
                />
                <View style={styles.header_container}>
                  <TouchableOpacity
                    onPress={loginUser}
                    style={styles.btnNewContainer}
                  >
                  <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>I don't have an account</Text>

              <View style={styles.header_container}>
                  <TouchableOpacity
                    onPress={SwitchSignup}
                    style={styles.btnNewContainer}
                  >
                  <Text style={styles.textButton}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
			)
}

export default Login

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
  