import EStyleSheet from "react-native-extended-stylesheet";

export const styles = (background) => {
  EStyleSheet.create({
    loginMain: {
      flex: 1,
      backgroundColor: background,
    },
  });
};
