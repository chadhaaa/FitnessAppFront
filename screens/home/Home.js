import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import musculation from "../../assets/musculation.png";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ ...props }) => {
  const { user, navigation } = props;
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log("props", props);
  }, [isFocused]);

  return (
    <View>
      <Text> {user._id}</Text>
      <Text> {user.token}</Text>
      <Button title="logout" onPress={() => navigation.navigate("Login")} />

      <Card style={Styles.container}>
        <Card.Content>
          <Title>FitnessApp By Team 9</Title>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 37,
  },
});
