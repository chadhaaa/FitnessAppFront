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
//import { Picker } from "@react-native-picker/picker";

const CrudDefis = () => {
  const [defi, setDefi] = useState([]);
  const [visible, setVisible] = useState(false);
  const [goal, setGoal] = useState("");
  const [link, setLink] = useState("");
  const [done, setDone] = useState(false);
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getDefis();
  }, []);
  const getDefis = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    const response = await axios
      .get("http://192.168.1.197:8000/api/challenges", { headers })
      .then((res) => {
        console.log(res);
        setDefi(res.data);
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
      .delete("http://192.168.1.197:8000/api/challenge/" + item._id, {
        headers,
      })
      .then((res) => {
        var respo = res.data;
        getDefis();
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    if (hideId == null) {
      const formdata = {
        goal: goal,
        link: link,
        done: done,
      };
      axios
        .post("http://192.168.1.197:8000/api/challenge", formdata)
        .then((res) => {
          const response = res.data;
          getDefis();
          setGoal("");
          setLink("");
          setDone(false);
          setVisible(false);
        });
    } else {
      const formdata = {
        _id: hideId,
        goal: goal,
        link: link,
        done: done,
      };
      axios
        .put("http://192.168.1.197:8000/api/challenge/" + hideId, formdata)
        .then((res) => {
          const response = res.data;
          getDefis();
          setGoal("");
          setLink("");
          setDone(false);
          setVisible(false);
        });
    }
  };
  const handleEdit = (item) => {
    setVisible(true);
    setHideId(item._id);
    setGoal(item.goal);
    setLink(item.link);
    setDone(item.done);
  };

  const handleVisibleModal = () => {
    setVisible(!visible);
    setHideId(null);
  };

  const onChangeGoal = (value) => {
    setGoal(value);
  };

  const onChangeLink = (value) => {
    setLink(value);
  };

  const onChangeDone = (value) => {
    setDone(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}
        >
          <Text style={styles.textButton}> Add New Challenge</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View style={styles.form}>
            <TouchableOpacity onPress={handleVisibleModal}>
              <Text style={styles.txtClose}> Close</Text>
            </TouchableOpacity>

            <TextInput
              value={goal}
              style={styles.text_input}
              placeholder="Description goal"
              onChangeText={onChangeGoal}
            />
            <TextInput
              value={link}
              style={styles.text_input}
              placeholder="Challenge Link"
              onChangeText={onChangeLink}
            />
            <Text style={styles.text}>
              Did the player successfully complete their challenge? ?
            </Text>
            <View style={styles.switchStyle}>
              <Switch
                value={done}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={done ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={onChangeDone}
              />
            </View>

            <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
              <Text style={styles.textButton}>
                {" "}
                {hideId == null ? "Add Defi" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {defi.map((item, index) => {
          return (
            <View style={styles.item_course} key={index}>
              <View>
                <Text style={styles.txt_name}>{item.goal}</Text>
                <Text style={styles.txt_item}>{item.link}</Text>
                <Text style={styles.txt_item}>{String(item?.done)}</Text>
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

export default CrudDefis;

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
