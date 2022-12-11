import { View, Text, Button, ScrollView } from "react-native";
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
    <ScrollView>
      <View>
        <Text>Day</Text>
        <Text>{day}</Text>
        <Text>Hour</Text>
        <Text>{hour}</Text>
        <Text>Feedback</Text>
        <Text>{feedback}</Text>
        <Button
          title="Show Details"
          onPress={() =>
            navigation.navigate("One Session Details", {
              sessionDetails: id,
            })
          }
        />
      </View>
    </ScrollView>
  );
};

export default Seance;
