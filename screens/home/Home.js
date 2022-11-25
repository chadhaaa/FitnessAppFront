import { View, Text, Button } from "react-native";
import React from "react";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text> This is where all you stuff goes !</Text>
      {/* <Button
        title="Competences"
        onPress={() => navigation.navigate("Competences")}
      />
      <Button
        title="Invite a Player"
        onPress={() => navigation.navigate("InvitePlayer")}
      /> */}
      <Button
        title="Handle Statistics"
        onPress={() => navigation.navigate("Statistics")}
      />
    </View>
  );
};

export default Home;
