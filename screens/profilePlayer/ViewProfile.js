import { View, Text } from "react-native";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ProfilePage from "./ProfilePage";

const ViewProfile = () => {
  const [profile, setProfile] = useState([]);
  const [stat, setStat] = useState([]);
  const [Comp, setComp] = useState([]);

  const getProfile = async () => {
    const response = await axios
      .get(`http://192.168.1.197:8000/api/viewProfile/628591301cbedd1f6918329b`)
      .then((response) => {
        setProfile(response.data.player);
        setStat(response.data.stats);
        setComp(response.data.comp);
      })
      .then((error) => console.log(error));
  };
  console.log("stat", stat);
  console.log("comp", Comp);

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <View>
      <Text>viewProfile</Text>
      <ProfilePage
        firstname={profile.firstname}
        lastname={profile.lastname}
        weight={profile.weight}
        email={profile.email}
        height={profile.height}
        picture={profile.picture}
        tel={profile.tel}
        goal={profile.goal}
        scholar={profile.scholar}
      />
      <View>
        <Text>My statistics</Text>
        {stat.map((item, index) => {
          if (item.statId.visibility) {
            return (
              <View key={index}>
                <Text> Title :</Text>
                <Text> {item.statId.title} </Text>
                <Text> Link :</Text>
                <Text> {item.statId.link} </Text>
                <Text> Description :</Text>
                <Text> {item.statId.description} </Text>
                <Text> Current State :</Text>
                <Text> {item.statId.currentState} </Text>
                <Text> Unit : </Text>
                <Text>
                  {(item.statId.unit[0] && item?.statId.unit[0].value) ||
                    item.statId.unit[0]}{" "}
                </Text>
                <Text> Type :</Text>
                <Text>
                  {" "}
                  {(item.statId.type[0] && item.statId.type[0].value) ||
                    item.statId.type[0]}
                </Text>
                <Text> Min or Max ? </Text>
                <Text>
                  {" "}
                  {(item.statId.minMax[0] && item.statId.minMax[0].value) ||
                    item.statId.minMax[0]}
                </Text>
              </View>
            );
          } else {
            return <Text> There are no statistics to show !!</Text>;
          }
        })}
      </View>
      <View>
        <Text>My competences</Text>
        {Comp.map((item, index) => {
          if (item.compId.visibility) {
            return (
              <View key={index}>
                <Text>Name : </Text>
                <Text>{item.compId.name}</Text>
                <Text> Description :</Text>
                <Text> {item.compId.description} </Text>
                <Text> Link :</Text>
                <Text> {item.compId.link} </Text>
              </View>
            );
          } else {
            return <Text> There are no competences to show !! </Text>;
          }
        })}
      </View>
    </View>
  );
};

export default ViewProfile;
