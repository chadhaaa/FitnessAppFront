import { View, Text, Image } from "react-native";
import React from "react";
import axios from "axios";
import { useState } from "react";

const ProfilePage = ({
  firstname,
  lastname,
  weight,
  height,
  goal,
  picture,
  email,
  tel,
  scholar,
}) => {
  return (
    <View>
      <Text style={{ fontSize: 40 }}>My profile</Text>
      <Text style={{ fontWeight: "bold", fontSize: 23 }}> My picture</Text>
      <Image
        // source={`http://192.168.1.197:8000/${picture}`}
        source={{ uri: picture }}
        style={{ width: 200, height: 200, borderRadius: 400 / 2 }}
      />
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}> FirstName</Text>
        <Text style={{ fontSize: 15 }}> {firstname}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}> LastName</Text>
        <Text style={{ fontSize: 15 }}> {lastname}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}> Email</Text>
        <Text style={{ fontSize: 15 }}> {email}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}> Weight</Text>
        <Text style={{ fontSize: 15 }}> {weight}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}> Height</Text>
        <Text style={{ fontSize: 15 }}> {height}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}> Goal</Text>
        <Text style={{ fontSize: 15 }}> {goal}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>
          {" "}
          Telephone Number
        </Text>
        <Text> {tel}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>Scholar </Text>
        <Text> {scholar}</Text>
      </View>
    </View>
  );
};

export default ProfilePage;
