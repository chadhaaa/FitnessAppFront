import { View, Text, ScrollView } from "react-native";
import React from "react";
import axios from "axios";
import Seance from "./SessionDetails";
import { useState, useEffect } from "react";

const GetSeance = () => {
  const [sessions, setSession] = useState([]);
  useEffect(() => {
    getSessions();
  }, []);

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
                day={session.day}
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
      </View>
    </ScrollView>
  );
};

export default GetSeance;
