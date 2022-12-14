import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
// import { styles } from "./Styles";
import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { moderateScale, scale } from "react-native-size-matters";

const Register = () => {
  //   const {
  //     colors: { background, text, "gray", card, secondary, primary },
  //     dark,
  //   } = useTheme();

  useEffect(() => {}, []);
  return (
    <View style={styles.loginMain}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}> Welcome to FitnessApp</Text>
          <Text style={styles.signInText}>
            {" "}
            Sign To to FitnessApp and Access Your features !
          </Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.wrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your First Name"
              />
            </View>
            <View style={styles.wrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Last Name"
              />
            </View>
            <View style={styles.wrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.wrapper}>
              <View style={styles.input}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <TextInput
                      placeholder="Enter your Password"
                      secureTextEntry={true}
                      style={{
                        height: scale(45),
                        color: "#472183",
                        fontWeight: "bold",
                      }}
                    />
                  </View>
                  <TouchableOpacity style={{ alignSelf: "center" }}>
                    <Ionicons name="key-outline" size={20} color={"#472183"} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "#82C3EC",
                height: scale(50),
                borderRadius: scale(10),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: moderateScale(30),
              }}
            >
              <Text style={{ color: "#fff", fontSize: 19 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.footerContainerInner}>
            <Text style={styles.newUserText}>I am already a Member</Text>
            <TouchableOpacity>
              <Text style={styles.signText}>Sign In !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  loginMain: {
    flex: 1,
    backgroundColor: "#F1F6F5",
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
  },
  headerContainer: {
    height: Dimensions.get("window").height / 4,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: moderateScale(30),
    fontWeight: "bold",
    color: "#4B56D2",
  },
  signInText: {
    color: "gray",
    fontSize: moderateScale(15),
    letterSpacing: 0.5,
    fontWeight: "bold",
    marginTop: moderateScale(20),
  },
  formContainer: {},
  inputContainer: {},
  wrapper: {
    marginTop: moderateScale(30),
  },
  input: {
    height: scale(49),
    color: "#472183",
    borderWidth: moderateScale(1),
    borderColor: "gray",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    fontWeight: "bold",
  },
  footerContainer: {
    height: Dimensions.get("window").height / 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  footerContainerInner: {
    flexDirection: "row",
  },
  signText: {
    marginLeft: moderateScale(5),
    color: "red",
  },
});
