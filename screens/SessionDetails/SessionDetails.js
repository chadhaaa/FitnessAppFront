import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Seance = ({
  //   navigation,
  day,
  idPlace,
  cancellation,
  reason,
  feedback,
  hour,
  programId,
  id,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Day</Text>
      <Text>{day}</Text>
      <Text>Hour</Text>
      <Text>{hour}</Text>
      <Text>Feedback</Text>
      <Text>{feedback}</Text>
      <Text>Id</Text>
      <Text>{id}</Text>
      <Button
        title="Show Details"
        onPress={() =>
          navigation.navigate("One Session Details", {
            sessionDetails: id,
          })
        }
      />
    </View>
  );
};

export default Seance;
