import { View, Text, ScrollView, RefreshControl } from "react-native";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ProfilePage from "./ProfilePage";
import { connect } from "react-redux";

const ViewProfile = ({ ...props }) => {
  const [profile, setProfile] = useState([]);
  const [stat, setStat] = useState([]);
  const [Comp, setComp] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const { user } = props;
  useEffect(() => {
    console.log("user id ", user._id);
  }, []);
  const getProfile = async () => {
    const response = await axios
      // .get(`http://192.168.1.197:8000/api/viewProfile/628591301cbedd1f6918329b`)
      .get(`http://192.168.1.197:8000/api/viewProfile/${user._id}`)

      .then((response) => {
        setProfile(response.data.player);
        setStat(response.data.stats);
        setComp(response.data.comp);
      })
      .then((error) => console.log(error));
  };
  console.log("stat", stat);
  console.log("comp", Comp);

  const onRefresh = () => {
    setRefreshing(true);
    getProfile();
    setRefreshing(false);
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
          My statistics
        </Text>
        {stat.map((item, index) => {
          if (item.statId.visibility) {
            return (
              <View key={item.statId._id}>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Title :
                </Text>
                <Text style={{ fontSize: 15 }}> {item.statId.title} </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Link :
                </Text>
                <Text style={{ fontSize: 15 }}> {item.statId.link} </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Description :
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  {item.statId.description}{" "}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Current State :
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  {item.statId.currentState}{" "}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Unit :{" "}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {(item.statId.unit[0] && item?.statId.unit[0].value) ||
                    item.statId.unit[0]}{" "}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Type :
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  {(item.statId.type[0] && item.statId.type[0].value) ||
                    item.statId.type[0]}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Min or Max ?{" "}
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  {(item.statId.minMax[0] && item.statId.minMax[0].value) ||
                    item.statId.minMax[0]}
                </Text>
              </View>
            );
          } else {
            return (
              <Text style={{ fontWeight: "bold", color: "red" }}>
                {" "}
                There are no statistics to show !!
              </Text>
            );
          }
        })}
      </View>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
          My competences
        </Text>
        {Comp.map((item, index) => {
          if (item.compId.visibility) {
            return (
              <View key={item.compId._id}>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  Name :{" "}
                </Text>
                <Text style={{ fontSize: 15 }}>{item.compId.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Description :
                </Text>
                <Text style={{ fontSize: 15 }}>
                  {" "}
                  {item.compId.description}{" "}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Link :
                </Text>
                <Text style={{ fontSize: 15 }}> {item.compId.link} </Text>
              </View>
            );
          } else {
            return (
              <Text style={{ fontWeight: "bold", color: "red" }}>
                {" "}
                There are no competences to show !!{" "}
              </Text>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    accessToken: state.auth.accessToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
