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
  // Picker,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Rating } from "react-native-ratings";

const CrudCompetences = () => {
  const [comp, setComp] = useState([]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [stars, setStars] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getComps();
  }, []);
  const getComps = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    const response = await axios
      .get("http://192.168.1.197:8000/api/competences", { headers })
      .then((res) => {
        console.log(res);
        setComp(res.data);
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
      .delete("http://192.168.1.197:8000/api/competence/" + item._id, {
        headers,
      })
      .then((res) => {
        var respo = res.data;
        getComps();
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    if (hideId == null) {
      const formdata = {
        name: name,
        description: description,
        link: link,
        stars: stars,
        visibility: visibility,
      };
      axios
        .post("http://192.168.1.197:8000/api/competence", formdata)
        .then((res) => {
          const response = res.data;
          getComps();
          setName("");
          setDescription("");
          setLink("");
          setStars("");
          setVisibility(false);
          setVisible(false);
        });
    } else {
      const formdata = {
        _id: hideId,
        name: name,
        description: description,
        link: link,
        stars: stars,
        visibility: visibility,
      };
      axios
        .put("http://192.168.1.197:8000/api/competence/" + hideId, formdata)
        .then((res) => {
          const response = res.data;
          getComps();
          setName("");
          setDescription("");
          setLink("");
          setStars("");
          setVisibility(false);
          setVisible(false);
        });
    }
  };
  const handleEdit = (item) => {
    setVisible(true);
    setHideId(item._id);
    setName(item.name);
    setDescription(item.description);
    setLink(item.link);
    setStars(item.stars);
    setVisibility(item.visibility);
  };

  const handleVisibleModal = () => {
    setVisible(!visible);
    setHideId(null);
  };

  const onChangeName = (value) => {
    setName(value);
  };

  const onChangeDescription = (value) => {
    setDescription(value);
  };

  const onChangeLink = (value) => {
    setLink(value);
  };

  const onChangeVisibility = (value) => {
    setVisibility(value);
  };

  const onChangeStars = (value) => {
    setStars(value);
  };
  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}
        >
          <Text style={styles.textButton}> Add New Competence</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaView>
          <View style={styles.form}>
            <TouchableOpacity onPress={handleVisibleModal}>
              <Text style={styles.txtClose}> Close</Text>
            </TouchableOpacity>
            <TextInput
              value={name}
              style={styles.text_input}
              placeholder="Competence Name"
              onChangeText={onChangeName}
            />
            <TextInput
              value={description}
              style={styles.text_input}
              placeholder="Competence Description"
              onChangeText={onChangeDescription}
            />

            <TextInput
              value={link}
              style={styles.text_input}
              placeholder="Competence Link"
              onChangeText={onChangeLink}
            />
            <Rating
              type="custom"
              ratingColor="yellow"
              ratingBackgroundColor="grey"
              ratingCount={5}
              imageSize={30}
              onFinishRating={onChangeStars}
              style={{ paddingVertical: 10 }}
              startingValue={stars}
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

            <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
              <Text style={styles.textButton}>
                {" "}
                {hideId == null ? "Add Competence" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {comp.map((item, index) => {
          return (
            <View style={styles.item_course} key={index}>
              <View>
                <Text style={styles.txt_name}> {item.name}</Text>

                <Text style={styles.txt_item}> {item?.description}</Text>

                <Text style={styles.txt_item}> {item.link}</Text>
                {/* <Text style={styles.txt_item}>
                  <Rating
                    startingValue={item?.stars}
                    type="custom"
                    ratingColor="yellow"
                    ratingBackgroundColor="grey"
                    imageSize={30}
                    readonly={true}
                    style={{ paddingVertical: 10 }}
                  />
                </Text> */}
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

export default CrudCompetences;

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
