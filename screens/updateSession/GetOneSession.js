import { View, Text, Button, ScrollView } from "react-native";
import React, { Profiler } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import OneSeance from "./GetOneSessionPage";
import { useIsFocused } from "@react-navigation/native";
import { Rating } from "react-native-ratings";

const GetSessionDetail = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const { sessionDetails } = route.params;
  const [session, setSession] = useState([]);
  const [place, setPlace] = useState([]);
  const [programs, setProgram] = useState([]);
  const [stat, setStat] = useState([]);
  const [comp, setComp] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSession = async () => {
    await axios
      .get("http://192.168.1.197:8000/api/sessionDetails/" + sessionDetails)
      .then((response) => {
        console.log(response);
        setSession(response.data.session);
        setPlace(response.data.session.idPlace);
        setProgram(response.data.session.programId);
        setStat(response.data.stats);
        setComp(response.data.comp);
      });
  };
  useEffect(() => {
    getSession();
  }, [isFocused]);

  useEffect(() => {
    if (loading) {
      getSession();
      setLoading(false);
    }
  }, [loading]);
  if (loading) {
    return <Text>loading ...</Text>;
  }
  return (
    <ScrollView>
      <View>
        <OneSeance
          id={session && session._id}
          reason={session && session.reason}
          day={session && session.day}
          feedback={session && session.feedback}
          cancellation={session && session.cancellation}
          hour={session && session.hour}
        />
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
            Place of Session
          </Text>
          {place && place?.length === 0 ? (
            <Text style={{ fontWeight: "bold", color: "red" }}>
              {" "}
              No data found !
            </Text>
          ) : (
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                {" "}
                Title :{" "}
              </Text>
              <Text style={{ fontSize: 18 }}> {place && place.Name}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                {" "}
                Country State :{" "}
              </Text>
              <Text style={{ fontSize: 18 }}>
                {" "}
                {place && place.countryState}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                {" "}
                Country :{" "}
              </Text>
              <Text style={{ fontSize: 18 }}> {place && place.country}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                {" "}
                Address :{" "}
              </Text>
              <Text style={{ fontSize: 18 }}> {place && place.address}</Text>
            </View>
          )}
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
            {" "}
            Competences :{" "}
          </Text>
          {comp && comp?.length === 0 ? (
            <Text style={{ fontWeight: "bold", color: "red" }}>
              {" "}
              No data found !
            </Text>
          ) : (
            comp.map((item, index) => (
              <View key={index}>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  Title :
                </Text>
                <Text style={{ fontSize: 18 }}>{item.compId.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  Description :
                </Text>
                <Text style={{ fontSize: 18 }}>{item.compId.description}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>Link :</Text>
                <Text style={{ fontSize: 18 }}>{item.compId.link}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  {" "}
                  Star Rating :
                </Text>
                <Rating
                  startingValue={item.compId.stars}
                  type="custom"
                  ratingColor="yellow"
                  ratingBackgroundColor="grey"
                  imageSize={30}
                  readonly={true}
                  style={{ paddingVertical: 10 }}
                />
              </View>
            ))
          )}
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
            Programs :
          </Text>
          {programs && programs?.length === 0 ? (
            <Text style={{ fontWeight: "bold", color: "red" }}>
              No data found !
            </Text>
          ) : (
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>Title :</Text>
              <Text style={{ fontSize: 18 }}>{programs && programs.title}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                Description :
              </Text>
              <Text style={{ fontSize: 18 }}>
                {programs && programs.description}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 23 }}>Link :</Text>
              <Text style={{ fontSize: 18 }}>{programs && programs.link}</Text>
            </View>
          )}
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
            {" "}
            Statistics :
          </Text>
          {stat && stat?.length === 0 ? (
            <Text style={{ fontWeight: "bold", color: "red" }}>
              {" "}
              No data found !
            </Text>
          ) : (
            stat.map((item, index) => (
              <View key={index}>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  Title :
                </Text>
                <Text style={{ fontSize: 18 }}> {item?.statId?.title}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>Unit :</Text>
                <Text style={{ fontSize: 18 }}>
                  {" "}
                  {(item?.statId?.unit && item?.statId?.unit[0].value) ||
                    item?.statId?.unit[0]}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>Type :</Text>
                <Text style={{ fontSize: 18 }}>
                  {" "}
                  {(item?.statId?.type && item?.statId?.type[0].value) ||
                    item?.statId?.type[0]}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  Min or Max ? :
                </Text>
                <Text style={{ fontSize: 18 }}>
                  {" "}
                  {(item?.statId?.minMax && item?.statId?.minMax[0].value) ||
                    item?.statId?.minMax[0]}
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  Description :
                </Text>
                <Text> {item?.statId?.description}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 23 }}>
                  Current State :
                </Text>
                <Text style={{ fontSize: 18 }}>
                  {" "}
                  {item?.statId?.currentState}
                </Text>
              </View>
            ))
          )}
        </View>
        <Button
          title="Back to List"
          onPress={() => navigation.navigate("List of Sessions (coach)")}
        />
      </View>
    </ScrollView>
  );
};

export default GetSessionDetail;
