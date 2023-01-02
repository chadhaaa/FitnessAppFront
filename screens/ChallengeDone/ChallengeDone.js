import {
  Button,
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
  
  const Challenges = () => {
    const [challenge, setChallenge] = useState([]);
    const [link, setLink] = useState();
    const [goal, setGoal] = useState();
    const [done, setDone] = useState();

    useEffect(() => {
      getChallenges();
    }, []);
    const getChallenges = async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      };
      const response = await axios
        .get("http://10.1.0.130:8000/api/challenges", { headers })
        .then((res) => {
          console.log(res);
          setChallenge(res.data);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    };
    const handleDone = (item) => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      };
      console.log(item)
      const formData = {
        done: true,
      }
      const response = axios
        .put("http://10.1.0.130:8000/api/challenge/" + item._id, formData)
        .then((res) => {
          var respo = res.data;
          getChallenges();
        })
        .catch((error) => console.log(error));
    };

    return (
      <SafeAreaView>
        <ScrollView>
          {challenge.map((item, index) => {
            return (
              <View style={styles.item_course} key={index}>
                <View>
                  <Text style={styles.txt_name}> {item.goal}</Text>
  
                  <Text style={styles.txt_item}> {item.link}</Text>
                </View>
                <View>
                  <Button disabled={item.done}  onPress={() => handleDone(item)} title='done'>
                  </Button>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Challenges;
  
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
  