import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import musculation from "../../assets/musculation.png";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/authActions";

const Home = ({ ...props }) => {
  const { user, navigation } = props;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("props", props);
  }, [isFocused]);

  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>
        {" "}
        Hello {user.firstname} {user.lastname}
      </Text>

      <Card style={Styles.container}>
        <Card.Content>
          <Title>FitnessApp By Chadha Hajji</Title>
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
      <Button title="Log out" onPress={() => navigation.navigate("Login")} />
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
