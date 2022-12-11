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

const CrudPrograms = () => {
  const [program, setProgram] = useState([]);
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getPrograms();
  }, []);
  const getPrograms = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    const response = await axios
      .get("http://192.168.124.4:8000/api/programs", { headers })
      .then((res) => {
        console.log(res);
        setProgram(res.data);
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
      .delete("http://192.168.124.4:8000/api/program/" + item._id, {
        headers,
      })
      .then((res) => {
        var respo = res.data;
        getPrograms();
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    if (hideId == null) {
      const formdata = {
        title: title,
        description: description,
        link: link,
        picture: picture,
      };
      axios
        .post("http://192.168.124.4:8000/api/program", formdata)
        .then((res) => {
          const response = res.data;
          getPrograms();
          setTitle("");
          setDescription("");
          setLink("");
          setPicture("");
        });
    } else {
      const formdata = {
        _id: hideId,
        title: title,
        description: description,
        link: link,
        picture: picture,
      };
      axios
        .put("http://192.168.124.4:8000/api/program/" + hideId, formdata)
        .then((res) => {
          const response = res.data;
          getPrograms();
          setTitle("");
          setDescription("");
          setLink("");
          setPicture("");
          setVisible(false);
        });
    }
  };
  const handleEdit = (item) => {
    setVisible(true);
    setHideId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setLink(item.link);
    setPicture(item.picture);
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

  const onChangePicture = (value) => {
    setPicture(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}
        >
          <Text style={styles.textButton}> Add New session program</Text>
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
              placeholder="Program Title"
              onChangeText={onChangeTitle}
            />
            <TextInput
              value={description}
              style={styles.text_input}
              placeholder="Program Description"
              onChangeText={onChangeDescription}
            />
            <TextInput
              value={link}
              style={styles.text_input}
              placeholder="Program video Link"
              onChangeText={onChangeLink}
            />
            <TextInput
              value={picture}
              style={styles.text_input}
              placeholder=" Program picture"
              onChangeText={onChangePicture}
            />

            <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
              <Text style={styles.textButton}>
                {" "}
                {hideId == null ? "Add program" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {program.map((item, index) => {
          return (
            <View style={styles.item_course} key={index}>
              <View>
                <Text style={styles.txt_name}>{item.title}</Text>
                <Text style={styles.txt_item}>{item?.description}</Text>
                <Text style={styles.txt_item}>{item.link}</Text>
                <Text style={styles.txt_item}>{item.picture}</Text>
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

export default CrudPrograms;

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
