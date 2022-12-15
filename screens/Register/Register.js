import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { moderateScale, scale } from "react-native-size-matters";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { registerPlayer } from "../Api/Auth/Index";

const signUpValidationSchema = yup.object().shape({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password mush have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});
const Register = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const navigation = useNavigation();
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
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              firstname: "",
              lastname: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setShowSpinner(true);
              console.log("values", values);
              registerPlayer(values)
                .then((res) => {
                  console.log("response", res);
                  setShowSpinner(false);
                  navigation.navigate("Login");
                })
                .catch((err) => {
                  console.log("error", err.response.data?.msg);
                  setShowSpinner(false);
                });
            }}
          >
            {({
              handleSubmit,
              isValid,
              values,
              errors,
              handleChange,
              touched,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <View style={styles.wrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your First Name"
                      name="firstname"
                      onChangeText={handleChange("firstname")}
                      placeholderTextColor="#472183"
                    />
                    {errors.firstname && touched.firstname && (
                      <Text
                        style={{
                          fontSize: scale(10),
                          color: "red",
                          marginTop: scale(5),
                        }}
                      >
                        {errors.firstname}
                      </Text>
                    )}
                  </View>
                  <View style={styles.wrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your Last Name"
                      name="lastname"
                      onChangeText={handleChange("lastname")}
                      placeholderTextColor="#472183"
                    />
                    {errors.lastname && touched.lastname && (
                      <Text
                        style={{
                          fontSize: scale(10),
                          color: "red",
                          marginTop: scale(5),
                        }}
                      >
                        {errors.lastname}
                      </Text>
                    )}
                  </View>
                  <View style={styles.wrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your Email"
                      keyboardType="email-address"
                      name="email"
                      onChangeText={handleChange("email")}
                      placeholderTextColor="#472183"
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: scale(10),
                          color: "red",
                          marginTop: scale(5),
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
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
                            secureTextEntry={showPassword}
                            style={{
                              height: scale(45),
                              color: "#472183",
                              fontWeight: "bold",
                            }}
                            name="password"
                            onChangeText={handleChange("password")}
                            placeholderTextColor="#472183"
                          />
                          {errors.password && touched.password && (
                            <Text
                              style={{
                                fontSize: scale(10),
                                color: "red",
                                marginTop: scale(5),
                              }}
                            >
                              {errors.password}
                            </Text>
                          )}
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                          style={{ alignSelf: "center" }}
                        >
                          <Ionicons
                            name={showPassword ? "key-outline" : "key"}
                            size={20}
                            color={"#472183"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={handleSubmit}
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
                    <Text style={{ color: "#fff", fontSize: 19 }}>
                      Register
                    </Text>
                    {showSpinner && <ActivityIndicator color="red" />}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.footerContainerInner}>
            <Text style={styles.newUserText}>I am already a Member</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
