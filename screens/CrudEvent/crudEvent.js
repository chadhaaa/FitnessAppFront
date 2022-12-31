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
  Button,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const CrudEvents = () => {
  const [eventt, setEvent] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [mode, setMode] = useState("dateDebut");
  const [show, setShow] = useState(false);
  const [hour, setHour] = useState("");
  const [place, setPlace] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    const response = await axios
      .get("http://192.168.124.4:8000/api/events", { headers })
      .then((res) => {
        console.log(res);
        setEvent(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = (item) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    const response = axios
      .delete("http://192.168.124.4:8000/api/event/" + item._id, {
        headers,
      })
      .then((res) => {
        var respo = res.data;
        getEvents();
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    if (hideId == null) {
      const formdata = {
        title: title,
        description: description,
        dateDebut: dateDebut,
        dateFin: dateFin,
        hour: hour,
        place: place,
        visibility: visibility,
      };
      axios
        .post("http://192.168.124.4:8000/api/event", formdata)
        .then((res) => {
          const response = res.data;
          getEvents();
          setTitle("");
          setDescription("");
          setDateDebut("");
          setDateFin("");
          setHour("");
          setPlace("");
          setVisibility(false);
          setVisible(false);
        });
    } else {
      const formdata = {
        _id: hideId,
        title: title,
        description: description,
        dateDebut: dateDebut,
        dateFin: dateFin,
        hour: hour,
        place: place,
        visibility: visibility,
      };
      axios
        .put("http://192.168.124.4:8000/api/event/" + hideId, formdata)
        .then((res) => {
          const response = res.data;
          getEvents();
          setTitle("");
          setDescription("");
          setDateDebut("");
          setDateFin("");
          setHour("");
          setPlace("");
          setVisibility(false);
          setVisible(false);
        });
    }
  };
  const handleEdit = (item) => {
    setHideId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setDateDebut(item.dateDebut);
    setDateFin(item.dateFin);
    setHour(item.hour);
    setPlace(item.place);
    setVisibility(item.visibility);
    setVisible(true);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };
  const showPicker = () => {
    setShow(true);
  };

  const handleVisibleModal = () => {
    setVisible(!visible);
    setHideId(null);
  };

  const onChangeTitle = (value) => {
    setTitle(value);
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const onChangeDateDebut = (event, selectedDate) => {
    const currentDate = selectedDate || dateDebut;
    setShow(Platform.OS === "ios");
    setDateDebut(currentDate);
    setShow(false);
  };

  const onChangeDateFin = (event, selectedDate) => {
    const currentDate = selectedDate || dateFin;
    setShow(Platform.OS === "ios");
    setDateFin(currentDate);
    setShow(false);
  };

  const onChangeHour = (value) => {
    setHour(value);
  };

  const onChangePlace = (value) => {
    setPlace(value);
  };

  const onChangeVisibility = (value) => {
    setVisibility(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}
        >
          <Text style={styles.textButton}> Add New Event</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View style={styles.form}>
            <TouchableOpacity onPress={handleVisibleModal}>
              <Text style={styles.txtClose}> Close</Text>
            </TouchableOpacity>

            <TextInput
              value={title}
              style={styles.text_input}
              placeholder="Event Title"
              onChangeText={onChangeTitle}
            />
            <TextInput
              value={description}
              style={styles.text_input}
              placeholder="Event Description"
              onChangeText={onChangeDescription}
            />

            <Text style={styles.text}>
              Do you want to make it visible to the player ?
            </Text>
            <View style={styles.switchStyle}>
              <Switch
                value={visibility}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={visibility ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={onChangeVisibility}
              />
            </View>

            <Text style={styles.text}>Event start date </Text>

            <View style={styles.textButton}>
              <Button
                title="Start date"
                onPress={() => {
                  showPicker();
                  showMode("dateDebut");
                }}
              />
            </View>

            <Text style={styles.text}>Event End Date </Text>
            <View style={styles.textButton}>
              <Button title="End date" onPress={() => showMode("dateFin")} />
            </View>

            <Text style={styles.text}>Time of the event </Text>
            <View style={styles.textButton}>
              <Button title="Time" onPress={() => showMode("time")} />
            </View>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateDebut}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeDateDebut}
              />
            )}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateFin}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeDateFin}
              />
            )}
            <TextInput
              value={place}
              style={styles.text_input}
              placeholder="Event Place"
              onChangeText={onChangePlace}
            />

            <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
              <Text style={styles.textButton}>
                {" "}
                {hideId == null ? "Add Event" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {eventt.map((item, index) => {
          return (
            <View style={styles.item_course} key={index}>
              <View>
                <Text style={styles.txt_name}>{item.title}</Text>
                <Text style={styles.txt_item}>{item?.description}</Text>
                <Text style={styles.txt_item}>{item.dateDebut}</Text>
                <Text style={styles.txt_item}>{item.dateFin}</Text>
                <Text style={styles.txt_item}>{item.hour}</Text>
                <Text style={styles.txt_item}>{item.place}</Text>
                <Text style={styles.txt_item}>{String(item?.visibility)}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <Text style={styles.txt_del}> Delete </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={styles.txt_edit}> Edit </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CrudEvents;

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
