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
import AsyncStorage from '@react-native-async-storage/async-storage';

const AssignChallenge = ({navigation}) => {
	const [idPlayer, setIdPlayer] = useState('');
	
	const onChangeIdPlayer = (value) => {
        setIdPlayer(value);
      };
	
      const assignChallengePlayer = () => {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        };
        const formData = {
          idPlayers : idPlayer,
        }
        axios
          .put("http://192.168.1.5:8000/api/assignChallengePlayer/6292ac340749749d7633a7f0/", formData)
         
            alert('challenge assigned to player')
       
      
      };

	return (
        <SafeAreaView>

            <View style={styles.header_container}>
                <TextInput
                value={idPlayer}
                style={styles.text_input}
                placeholder="Id Player"
                onChangeText={onChangeIdPlayer}
                />
               
                <View style={styles.header_container}>
                  <TouchableOpacity
                    onPress={assignChallengePlayer}
                    style={styles.btnNewContainer}
                  >
                  <Text style={styles.textButton}>Assign Challenge</Text>
                </TouchableOpacity>
              </View>
            </View>
        </SafeAreaView>
			)
}

export default AssignChallenge

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
  