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
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { Rating } from "react-native-ratings";
  
  const SessionCancel = () => {
    
    const { id , setId} = useState()
    const [reason, setReason] = useState()

    useEffect(() => {
      setReason("");
    }, []);

    const cancelSession = () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      };
      const formdata = {
        cancellation: true,
        reason: reason,
      };
      axios
        .put("http://192.168.108.64:8000/api/sessionCancel/6282bc1aa7beeceeb106a67c/", formdata)
        .then(() => {
          setReason("");
        })
        .catch((error) => console.log(error));
    
    };

    const onChangeReason = (value) => {
      setReason(value);
    };
    
    return (
      <SafeAreaView>
        <ScrollView>
        <View style={styles.header_container}>
            <Text style={styles.Text}>Cancel Session</Text>
        </View>
        <View>


        <TextInput
              value={reason}
              style={styles.text_input}
              placeholder=""
              onChangeText={onChangeReason}
        />
        <TouchableOpacity onPress={() => cancelSession()}>
                  <Text style={styles.txt_edit}> Cancel </Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default SessionCancel;
  
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
  });
  