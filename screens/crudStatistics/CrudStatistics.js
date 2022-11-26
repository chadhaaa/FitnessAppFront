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
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const CrudStatistics = () => {
  const [stat, setStat] = useState([]);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [unit, setUnit] = useState("s");
  const [type, setType] = useState("Compteur");
  const [minMax, setMinMax] = useState("Maximize");
  const [statAlert, setStatAlert] = useState(false);
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getStats();
  }, []);
  const getStats = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    const response = await axios
      .get("http://192.168.1.197:8000/api/statistics", { headers })
      .then((res) => {
        console.log(res);
        setStat(res.data);
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
      .delete("http://192.168.1.197:8000/api/statistic/" + item._id, {
        headers,
      })
      .then((res) => {
        var respo = res.data;
        getStats();
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    if (hideId == null) {
      const formdata = {
        title: title,
        description: description,
        link: link,
        currentState: currentState,
        visibility: visibility,
        unit: unit,
        type: type,
        minMax: minMax,
        statAlert: statAlert,
      };
      axios
        .post("http://192.168.1.197:8000/api/statistic", formdata)
        .then((res) => {
          const response = res.data;
          getStats();
          setTitle("");
          setDescription("");
          setLink("");
          setCurrentState("");
          setVisibility(false);
          setVisible(false);
          setUnit("");
          setType("");
          setMinMax("");
          setStatAlert(false);
        });
    } else {
      const formdata = {
        _id: hideId,
        title: title,
        description: description,
        link: link,
        currentState: currentState,
        visibility: visibility,
        unit: unit,
        type: type,
        minMax: minMax,
        statAlert: statAlert,
      };
      axios
        .put("http://192.168.1.197:8000/api/statistic/" + hideId, formdata)
        .then((res) => {
          const response = res.data;
          getStats();
          setTitle("");
          setDescription("");
          setLink("");
          setCurrentState("");
          setVisibility(false);
          setVisible(false);
          setUnit("");
          setType("");
          setMinMax("");
          setStatAlert(false);
        });
    }
  };
  const handleEdit = (item) => {
    setVisible(true);
    setHideId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setLink(item.link);
    setCurrentState(item.currentState);
    setVisibility(item.visibility);
    setUnit(item.unit);
    setType(item.type);
    setMinMax(item.minMax);
    setStatAlert(item.statAlert);
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

  const onChangeLink = (value) => {
    setLink(value);
  };

  const onChangeCurrentState = (value) => {
    setCurrentState(value);
  };

  const onChangeVisibility = (value) => {
    setVisibility(value);
  };

  const onChangeAlertState = (value) => {
    setStatAlert(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}
        >
          <Text style={styles.textButton}> Add New Statistic</Text>
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
              placeholder="Statistic Title"
              onChangeText={onChangeTitle}
            />
            <TextInput
              value={description}
              style={styles.text_input}
              placeholder="Statistic Description"
              onChangeText={onChangeDescription}
            />
            <TextInput
              value={currentState}
              style={styles.text_input}
              placeholder="Statistic Current State"
              onChangeText={onChangeCurrentState}
            />
            <TextInput
              value={link}
              style={styles.text_input}
              placeholder="Statistic Link"
              onChangeText={onChangeLink}
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

            <Text style={styles.text}>Choose a Stat Unit :</Text>
            <Picker
              selectedValue={unit}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setUnit(itemValue)}
            >
              <Picker.Item label="s" value="s" />
              <Picker.Item label="min" value="min" />
              <Picker.Item label="km" value="km" />
              <Picker.Item label="m" value="m" />
              <Picker.Item label="h" value="h" />
              <Picker.Item label="kg" value="kg" />
            </Picker>

            <Text style={styles.text}>Choose a Stat Type :</Text>
            <Picker
              selectedValue={type}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            >
              <Picker.Item label="Compteur" value="Compteur" />
              <Picker.Item label="Timer" value="Timer" />
              <Picker.Item label="+/-" value="+/-" />
            </Picker>

            <Text style={styles.text}>
              Do you want to Minimize or Maximize this Stat ?{" "}
            </Text>
            <Picker
              selectedValue={minMax}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setMinMax(itemValue)}
            >
              <Picker.Item label="Minimize" value="Minimize" />
              <Picker.Item label="Maximize" value="Maximize" />
            </Picker>

            <Text style={styles.text}>
              Do you want to receive a Stat Alert ?
            </Text>
            <View style={styles.switchStyle}>
              <Switch
                value={statAlert}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={visibility ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={onChangeAlertState}
              />
            </View>

            <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
              <Text style={styles.textButton}>
                {" "}
                {hideId == null ? "Add Statistic" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {stat.map((item, index) => {
          return (
            <View style={styles.item_course} key={index}>
              <View>
                <Text style={styles.txt_name}>{item.title}</Text>
                <Text style={styles.txt_item}>
                  {(item.type[0] && item?.type[0].value) || item.type[0]}
                </Text>
                <Text style={styles.txt_item}>{item?.description}</Text>
                <Text style={styles.txt_item}>{item.currentState}</Text>
                <Text style={styles.txt_item}>{item.link}</Text>
                <Text style={styles.txt_item}>{String(item?.visibility)}</Text>
                <Text style={styles.txt_item}>
                  {(item.unit[0] && item?.unit[0].value) || item.unit[0]}
                </Text>
                <Text style={styles.txt_item}>
                  {(item.minMax[0] && item?.minMax[0].value) || item.minMax[0]}
                </Text>
                <Text style={styles.txt_item}>{String(item?.statAlert)}</Text>
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

export default CrudStatistics;

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
    borderBottomColor: "#e2e2e2",
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
