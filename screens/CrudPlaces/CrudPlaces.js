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
//import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const CrudPlaces = () => {
  const [place, setPlace] = useState([]);
  const [name , setName] = useState("");
  const [countryState, setCountryState] = useState("");
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState("");
  const [visible, setVisible] = useState(false);
  const [hideId, setHideId] = useState(null);

  useEffect(() => {
    getPlaces();
  }, []);

  

  const getPlaces = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    };
    const response = await axios
      .get("http://192.168.108.64:8000/api/places", { headers })
      .then((res) => {
        console.log(res);
        setPlace(res.data);
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
      .delete("http://192.168.108.64:8000/api/place/" + item._id, {
        headers,
      })
      .then((res) => {
        var respo = res.data;
        getPlaces();
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    if (hideId == null) {
      const formdata = {
        name: name,
        countryState: countryState,
        country: country,
        address: address,
      };
      axios
        .post("http://192.168.108.64:8000/api/place", formdata)
        .then((res) => {
          const response = res.data;
          getPlaces();
          setName("");
          setCountryState("");
          setCountry("");
          setAddress("");
          setVisible(false);
        });
    } else {
      const formdata = {
        _id: hideId,
        name: name,
        countryState: countryState,
        country: country,
        address: address,
      };
      axios
        .put("http://192.168.108.64:8000/api/place/" + hideId, formdata)
        .then((res) => {
          const response = res.data;
          getPlaces();
          setName("");
          setCountryState("");
          setCountry("");
          setAddress("");
          setVisible(false);
        });
    }
  };
  const handleEdit = (item) => {
    setHideId(item._id);
    getPlaces();
    setName("");
    setCountryState("");
    setCountry("");
    setAddress("");
    setVisible(false);
    setVisible(true);
  };

  const handleVisibleModal = () => {
    setVisible(!visible);
    setHideId(null);
  };

  const onChangeName = (value) => {
    setName(value);
  };

  const onChangeCountryState = (value) => {
    setCountryState(value);
  };

  const onChangeCountry = (value) => {
    setCountry(value);
  };

  const onChangeAddress = (value) => {
    setAddress(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.header_container}>
        <TouchableOpacity
          onPress={handleVisibleModal}
          style={styles.btnNewContainer}
        >
          <Text style={styles.textButton}> Add New Place</Text>
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
              placeholder="Place Name"
              onChangeText={onChangeName}
            />
            <TextInput
              value={countryState}
              style={styles.text_input}
              placeholder="Place Country State"
              onChangeText={onChangeCountryState}
            />
            <TextInput
              value={country}
              style={styles.text_input}
              placeholder="Place Country"
              onChangeText={onChangeCountry}
            />
            <TextInput
              value={address}
              style={styles.text_input}
              placeholder="Place Address"
              onChangeText={onChangeAddress}
            />

            <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
              <Text style={styles.textButton}>
                {" "}
                {hideId == null ? "Add Place" : "Update"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {place.map((item, index) => {
          return (
            <View style={styles.item_course} key={index}>
              <View>
                <Text style={styles.txt_name}>{item.Name}</Text>
                <Text style={styles.txt_item}>{item?.countryState}</Text>
                <Text style={styles.txt_item}>{item.country}</Text>
                <Text style={styles.txt_item}>{item.address}</Text>
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

export default CrudPlaces;

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
  btnContainer: {
    padding: 30,
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
