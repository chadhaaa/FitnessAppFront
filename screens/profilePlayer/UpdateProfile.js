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
      .get(
        `http://192.168.1.197:8000/api/UpdateProfilePlayer/628591301cbedd1f6918329b`
      )
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
      <Text>Update Your Profile</Text>
      <TextInput
        value={firstname}
        placeholder="Firstname"
        onChangeText={onChangeFirstname}
      />
      <TextInput
        value={lastname}
        placeholder="Lastname"
        onChangeText={onChangeLastname}
      />
      <TextInput
        value={height}
        placeholder="Height"
        onChangeText={onChangeHeight}
      />
      <TextInput
        value={weight}
        placeholder="Weight"
        onChangeText={onChangeWeight}
      />
      <TextInput
        value={tel}
        placeholder="Telephone Number"
        onChangeText={onChangeTel}
      />
      <TextInput
        value={scholar}
        placeholder="Scholar"
        onChangeText={onChangeScholar}
      />
      <View>
        <TouchableOpacity onPress={openImageLibrary}>
          {file ? (
            <Image
              source={{ uri: file }}
              style={{ width: 200, height: 200, borderRadius: 400 / 2 }}
            />
          ) : (
            <Text>Update Profile Image</Text>
          )}
        </TouchableOpacity>
        {/* <Text>Skip</Text>
        {file ? <Text onPress={updateProfile}> Upload</Text> : null} */}
      </View>
      <Button onPress={updateProfile} title="Update" />
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
