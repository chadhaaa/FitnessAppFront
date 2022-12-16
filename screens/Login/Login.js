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
import { Formik, Field } from "formik";
import { loginPlayer } from "../Api/Auth/Index";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { setTokenInterceptor } from "../../utils/setTokenInterceptor";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email !")
    .required("Email is required !"),
  password: yup.string().required("Password is required"),
});

const Login = ({ ...props }) => {
  const { updateUserLogin, updateUserAccessToken, user, isLoggedIn } = props;

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
            Sign In to Access your Account !
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Formik
            validationSchema={signInValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              setShowSpinner(true);
              console.log("values", values);
              loginPlayer(values)
                .then((res) => {
                  console.log("response", res);
                  setShowSpinner(false);
                  navigation.navigate("Home");
                  updateUserLogin(res, true);
                  updateUserAccessToken(res.token);
                  console.log("User coming from state", user);
                  console.log("isLoggedIn coming from state", isLoggedIn);
                  setTokenInterceptor(res);
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
                      placeholder="Enter your Email"
                      keyboardType="email-address"
                      name="email"
                      onChangeText={handleChange("email")}
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: 10,
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
                              width: "93%",
                            }}
                            name="password"
                            onChangeText={handleChange("password")}
                          />
                          {errors.password && touched.password && (
                            <Text
                              style={{
                                fontSize: 10,
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
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 19,
                        marginLeft: scale(5),
                      }}
                    >
                      Login
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
            <Text style={styles.newUserText}>No account ? Register here</Text>
            <TouchableOpacity>
              <Text style={styles.signText}>Sign Up !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

Login.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  updateUserLogin: PropTypes.func.isRequired,
  updateUserAccessToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateUserLogin: (user, isLoggedIn) =>
    dispatch(authActions.updateUserLogin(user, isLoggedIn)),
  updateUserAccessToken: (token) =>
    dispatch(authActions.updateUserAccessToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

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
    height: moderateScale(49),
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
