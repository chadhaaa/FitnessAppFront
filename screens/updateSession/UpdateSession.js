import { View, Text, ScrollView, TextInput, Button } from "react-native";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";

const UpdateSession = () => {
  const [day, setDay] = useState(new Date());
  const [hour, setHour] = useState("");
  const [cancellation, setCancellation] = useState("");
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

  // Operations on Competences
  const [comp, setComp] = useState([]);
  const [everyComp, setEveryComp] = useState([]);

  // Operations on Statistics
  const [stats, setStats] = useState([]);
  const [everyStat, setEveryStat] = useState([]);

  // For DatePicker
  const [mode, setMode] = useState("day");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  const chooseCom = (value) => {
    setComp(value);
  };

  const chooseStat = (value) => {
    setStats(value);
  };

  const onChangeDay = (event, selectedDate) => {
    const currentDate = selectedDate || day;
    setShow(Platform.OS === "android");
    setDay(currentDate);

    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fDate);
    setShow(false);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const updateSession = () => {
    const formdata = {
      day: day,
      hour: hour,
      cancellation: cancellation,
      reason: reason,
      feedback: feedback,
      stats: stats,
      comp: comp,
    };

    axios.put(
      `http://192.168.1.197:8000/api/SessionUpdate/6282bc1aa7beeceeb106a67d`,
      formdata
    );
  };

  // Getting All Competences
  useEffect(() => {
    if (loading2) {
      axios
        .get("http://192.168.1.197:8000/api/competences")
        .then((response) => {
          const newArray = response.data.map((item) => {
            return { key: item._id, value: item.name };
          });

          setEveryComp(newArray);
          setLoading2(false);
        });
    }
  }, [loading2]);

  // Getting All Statistics
  useEffect(() => {
    if (loading3) {
      axios.get("http://192.168.1.197:8000/api/statistics").then((response) => {
        const newArray1 = response.data.map((item) => {
          return { key: item._id, value: item.title };
        });
        setEveryStat(newArray1);
        setLoading3(false);
      });
    }
  }, [loading3]);

  // Setting New Changes
  useEffect(() => {
    if (loading) {
      axios
        .get(
          `http://localhost:8000/api/sessionDetails/6282bc1aa7beeceeb106a67d`
        )
        .then((res) => {
          console.log({ response: { ...res } });
          setDay(res.data.player.day);
          setHour(res.data.player.hour);
          setCancellation(res.data.player.cancellation);
          setReason(res.data.player.reason);
          setFeedback(res.data.player.feedback);
          setComp(res.data.comp);
          setStats(res.data.stats);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <ScrollView>
      <View>
        <Text>Update Player Infos</Text>
        <TextInput
          value={cancellation}
          placeholder="Cancellation"
          onChangeText={(cancellation) => setCancellation(cancellation)}
        />
        <TextInput
          value={reason}
          placeholder="Reason"
          onChangeText={(reason) => setReason(reason)}
        />

        <TextInput
          value={feedback}
          placeholder="Feedback"
          onChangeText={(feedback) => setFeedback(feedback)}
        />

        <TextInput
          value={hour}
          placeholder="Hour"
          onChangeText={(hour) => setHour(hour)}
        />

        <Text>Choose Competence :</Text>
        <MultipleSelectList
          setSelected={chooseCom}
          data={everyComp}
          save="key"
          label="Competences"
        />
        <Text>Choose Statistic :</Text>
        <MultipleSelectList
          setSelected={chooseStat}
          data={everyStat}
          save="key"
          label="Statistics"
        />
        <View>
          <Button title="Pick a Date" onPress={() => showMode()} />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={day}
            mode={mode}
            // display="default"
            onChange={onChangeDay}
          />
        )}
        <Button title="Update Session" onPress={updateSession} />
      </View>
    </ScrollView>
  );
};

export default UpdateSession;
