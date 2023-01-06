import { View, Text, ScrollView, Button, FlatList } from "react-native";
import React from "react";
import axios from "axios";
import Seance from "./SessionDetails";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import DateTimePicker from "@react-native-community/datetimepicker";

const GetSeance = ({ navigation }) => {
  const [sessions, setSession] = useState([]);
  const isFocused = useIsFocused();
  const [data, setData] = useState(sessions);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    getSessions();
  }, [isFocused]);

  const getSessions = async () => {
    const response = await axios.get(
      "http://192.168.1.197:8000/api/sessionSDetails"
    );
    setSession(response.data);
  };

  const onDateNowChange = (value) => {
    setSelectedDate(value);
    const filteredList = sessions.filter((session) =>
      moment(session.day).isSame(value, "day")
    );
    setFilteredList(filteredList);
  };

  return (
    <ScrollView>
      <View>
        <View>
          <DatePicker mode="datepicker" onDateChange={onDateNowChange} />

          {filteredList.map((item) => {
            return (
              <View key={item._id}>
                <Seance
                  id={item._id}
                  key={item._id}
                  day={moment(item.day).format("YYYY/MM/DD").toString()}
                  feedback={item.feedback}
                  hour={item.hour}
                />
              </View>
            );
          })}
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "green" }}>
          Sessions List :{" "}
        </Text>
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

export default GetSeance;
