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
      <Text>My profile</Text>
      <Text> My picture</Text>
      <Image
        // source={`http://192.168.1.197:8000/${picture}`}
        source={{ uri: picture }}
        style={{ width: 200, height: 200, borderRadius: 400 / 2 }}
      />
      <View>
        <Text> FirstName</Text>
        <Text> {firstname}</Text>
        <Text> LastName</Text>
        <Text> {lastname}</Text>
        <Text> Email</Text>
        <Text> {email}</Text>
        <Text> Weight</Text>
        <Text> {weight}</Text>
        <Text> Height</Text>
        <Text> {height}</Text>
        <Text> Goal</Text>
        <Text> {goal}</Text>
        <Text> Telephone Number</Text>
        <Text> {tel}</Text>
        <Text>Scholar </Text>
        <Text> {scholar}</Text>
      </View>
    </View>
  );
};

export default ProfilePage;
