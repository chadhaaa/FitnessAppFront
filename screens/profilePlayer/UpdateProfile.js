import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const UpdateProfile = ({ ...props }) => {
  const [file, setFile] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [scholar, setScholar] = useState("");

  const [list, setList] = useState([]);

  const { user } = props;

  const navigation = useNavigation();

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        setFile(response.assets[0].uri);
      }
    }
  };

  const onChangeFirstname = (value) => {
    setFirstname(value);
  };
  const onChangeLastname = (value) => {
    setLastname(value);
  };
  const onChangeWeight = (value) => {
    setWeight(value);
  };
  const onChangeHeight = (value) => {
    setHeight(value);
  };
  const onChangeTel = (value) => {
    setTel(value);
  };
  const onChangeScholar = (value) => {
    setScholar(value);
  };
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const response = await axios
      .get(`http://192.168.1.197:8000/api/profile/${user._id}`)
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => console.log(error));
  };

  const updateProfile = (item) => {
    const formdata = new FormData();

    formdata.append("firstname", firstname);
    formdata.append("lastname", lastname);
    formdata.append("weight", weight);
    formdata.append("password", password);
    formdata.append("height", height);
    formdata.append("tel", tel);
    formdata.append("scholar", scholar);
    formdata.append("picture", file);

    axios
      .put(
        // `http://192.168.1.197:8000/api/UpdateProfilePlayer/628591301cbedd1f6918329b`,
        `http://192.168.1.197:8000/api/UpdateProfilePlayer/${user._id}`,

        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        const response = res.data;
        console.log("test", item._id);
        getProfile();
      });
    setFirstname(item.firstname);
    setLastname(item.lastname);
    setHeight(item.height);
    setWeight(item.height);
    setTel(item.tel);
    setPassword(item.password);
    setScholar(item.scholar);
    setFile(item.file);
  };

  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "center" }}>
        Update Your Profile
      </Text>
      <View>
        <TouchableOpacity onPress={openImageLibrary}>
          {file ? (
            <Image
              source={{ uri: file }}
              style={{ width: 250, height: 250, borderRadius: 400 / 2 }}
            />
          ) : (
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Click Here To Update Profile Image
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <TextInput
        value={firstname}
        placeholder="Firstname"
        onChangeText={onChangeFirstname}
        style={{
          fontSize: 18,
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          margin: 8,
        }}
      />
      <TextInput
        value={lastname}
        placeholder="Lastname"
        onChangeText={onChangeLastname}
        style={{
          fontSize: 18,
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          margin: 8,
        }}
      />
      <TextInput
        value={height}
        placeholder="Height"
        onChangeText={onChangeHeight}
        style={{
          fontSize: 18,
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          margin: 8,
        }}
      />
      <TextInput
        value={weight}
        placeholder="Weight"
        onChangeText={onChangeWeight}
        style={{
          fontSize: 18,
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          margin: 8,
        }}
      />
      <TextInput
        value={tel}
        placeholder="Telephone Number"
        onChangeText={onChangeTel}
        style={{
          fontSize: 18,
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          margin: 8,
        }}
      />
      <TextInput
        value={scholar}
        placeholder="Scholar"
        onChangeText={onChangeScholar}
        style={{
          fontSize: 18,
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 8,
          margin: 8,
        }}
      />

      <Button onPress={updateProfile} title="Update" />
      <Button
        onPress={() => navigation.navigate("View Profile")}
        title="Back to Profile"
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    accessToken: state.auth.accessToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
