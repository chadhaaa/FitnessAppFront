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
  
  const ProfilePlayer = () => {
    
    const [profile, setProfile] = useState([])
	const [stat, setStat] = useState([])
	const [comp, setComp] = useState([])
	const [session, setSession] = useState([])
    useEffect(() => {
      getComps();
    }, []);
    const getComps = async () => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      };
      const response = await axios
        .get("http://192.168.1.5:8000/api/getProfileByCoach/5e9f9b9f9b9f9b9f9b9f9e11", { headers })
        .then((res) => {
            
            setProfile(res.data.player)
            setStat(res.data.stats)
            setComp([res.data.comp[0].compId])
            setSession(res.data.session)
            console.log(res.data.stats);
        })
        .catch((error) => console.log(error));
    };
    return (
      <SafeAreaView>
        <ScrollView>
        <View style={styles.header_container}>
            <Text style={styles.Text}>Player Profile</Text>
        </View>
        <View>
            <Text style={styles.txt_name}> {profile.firstname + ' ' +profile.lastname}</Text>


            <Text style={styles.txt_item}> {"   Email : " + profile.email}</Text>
            
            <Text style={styles.txt_item}>{"    Session number : " + profile.sessionNumbers}</Text>
            <Text style={styles.txt_item}>{"    Country : "+profile.country}</Text>
            <Text style={styles.txt_item}>{"    height : " +profile.height}</Text>
            <Text style={styles.txt_item}>{"    School : "+profile.scholar}</Text>
            <Text style={styles.txt_item}>{"    Phone : " +profile.tel}</Text>
            <Text style={styles.txt_item}>{"    Weight : " + profile.weight}</Text>


        </View>

        <ScrollView>
        <Text style={styles.txt_name}>  Competences</Text>
          {comp.map((item, index) => {
            return (
              <View style={styles.item_course} key={index}>
                <View>
                  <Text style={styles.txt_item}> Name : {item.name}</Text>
                  <Text style={styles.txt_item}> Description : {item?.description}</Text>
                  <Text style={styles.txt_item}> Link : {item.link}</Text>
                  <Text style={styles.txt_item}> Rate : 
                    <Rating
                      startingValue={item?.stars}
                      type="custom"
                      ratingColor="yellow"
                      ratingBackgroundColor="grey"
                      imageSize={30}
                      readonly={true}
                      style={{ paddingVertical: 10 }}
                    />
                  </Text>
                  <Text style={styles.txt_item}>{item.visibility ?  'Visible' : 'Not Visible'} </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <ScrollView>
        <Text style={styles.txt_name}>  Statistiques</Text>

          {stat.map((item, index) => {
            return (
              <View style={styles.item_course} key={index}>
                <View>
                  <Text style={styles.txt_name}> {item.title}</Text>
                  <Text style={styles.txt_item}> {item.description}</Text>
                  <Text style={styles.txt_item}> {item.link}</Text>
                  <Text style={styles.txt_item}>{item.currentState}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <ScrollView>
        <Text style={styles.txt_name}>  Sessions</Text>

          {session.map((item, index) => {
            return (
              <View style={styles.item_course} key={index}>
                <View>
                  <Text style={styles.txt_item}>    Date : {item.day}</Text>
                  <Text style={styles.txt_item}>    Hour : {item.hour}</Text>
                  <Text style={styles.txt_item}>    cancellation : {item.cancellation}</Text>
                  <Text style={styles.txt_item}>    Reason : {item.reason}</Text>
                  <Text style={styles.txt_item}>    Feedback : {item.feedback}</Text>

                </View>
                
              </View>
            );
          })}
        </ScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ProfilePlayer;
  
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
  