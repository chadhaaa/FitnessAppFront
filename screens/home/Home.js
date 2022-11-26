import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import musculation from "../../assets/musculation.png";
const Home = () => {
  return (
    <Card style={Styles.container}>
      <Card.Content>
        <Title>musculation By Team 8</Title>
      </Card.Content>
      <Card.Cover
        source={{
          musculation,
        }}
      />
      <Card.Content>
        <Paragraph>Explore the App ! </Paragraph>
      </Card.Content>
    </Card>
  );
};

export default Home;

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 37,
  },
});
