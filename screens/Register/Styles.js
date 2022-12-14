import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale } from "react-native-size-matters";

export const styles = (background, text, lightGray5, primary, dark) => {
  EStyleSheet.create({
    loginMain: {
      flex: 1,
      backgroundColor: "gray",
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
      color: lightGray5,
      fontSize: moderateScale(15),
      letterSpacing: 0.5,
      fontWeight: "bold",
    },
    formContainer: {},
    inputContainer: {},
    wrapper: {
      marginTop: moderateScale(30),
    },
    input: {
      height: moderateScale(55),
      color: text,
      borderWidth: moderateScale(1),
      borderColor: lightGray5,
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
      color: dark ? text : primary,
    },
  });
};
