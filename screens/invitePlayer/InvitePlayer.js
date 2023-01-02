import { TextInput, Button, DevSettings, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";

const InvitePlayer = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionPrice, setSessionPrice] = useState("");
  const [sessionNumbers, setSessionNumbers] = useState("");

  const onChangeFistname = (value) => {
    setFirstname(value);
  };
  const onChangeLastname = (value) => {
    setLastname(value);
  };
  const onChangeEmail = (value) => {
    setEmail(value);
  };
  const onChangePassword = (value) => {
    setPassword(value);
  };
  const onChangeSessionPrice = (value) => {
    setSessionPrice(value);
  };
  const onChangeSessionNumbers = (value) => {
    setSessionNumbers(value);
  };

  const handleSubmit = () => {
    const formdata = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      sessionPrice: sessionPrice,
      sessionNumbers: sessionNumbers,
    };
    axios
      .post("http://10.1.0.130:8000/api/players", formdata)
      .then((res) => {
        const response = res.data;
      });
    navigation.navigate("Home");
  };

  return (
    <View style={{ margin: 20 }}>
      <TextInput
        placeholder="Enter Firstname"
        onChangeText={onChangeFistname}
        style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
      />
      <TextInput
        placeholder="Enter Lastname"
        onChangeText={onChangeLastname}
        style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
      />
      <TextInput
        placeholder="Enter Email"
        onChangeText={onChangeEmail}
        style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
      />
      <TextInput
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={onChangePassword}
        style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
      />
      <TextInput
        placeholder="Enter Session Price"
        onChangeText={onChangeSessionPrice}
        style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
      />
      <TextInput
        placeholder="Enter Session Numbers"
        onChangeText={onChangeSessionNumbers}
        style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
      />
      <Button title="Invite player" onPress={handleSubmit} />
    </View>
  );
};
export default InvitePlayer;
