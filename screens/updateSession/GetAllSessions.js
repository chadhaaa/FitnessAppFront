import { View, Text, ScrollView, Button } from "react-native";
import React from "react";
import axios from "axios";
import Seance from "./SessionDetails";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";

const GetAllSessions = ({ navigation }) => {
  const [sessions, setSession] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getSessions();
  }, [isFocused]);

  const getSessions = async () => {
    const response = await axios.get(
      "http://192.168.1.197:8000/api/sessionSDetails"
    );
    setSession(response.data);
  };

  return (
    <ScrollView>
      <View>
        <Text>Sessions List : </Text>
        {sessions.map(function (session) {
          return (
            <View key={session._id}>
              <Seance
                id={session._id}
                key={session._id}
                day={moment(session.day).format("YYYY/MM/DD").toString()}
                idPlace={session.idPlace}
                cancellation={session.cancellation}
                reason={session.reason}
                feedback={session.feedback}
                hour={session.hour}
                programId={session.programId}
              />
            </View>
          );
        })}
        <Button
          title="Back to List"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </ScrollView>
  );
};

export default GetAllSessions;
