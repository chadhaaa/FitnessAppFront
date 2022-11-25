import { View, Text, Button } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text> This is where all you stuff goes !</Text>
      <Button
        title="Competences"
        onPress={() => navigation.navigate("Competences")}
      />
    </View>
  );
};

export default Home;
