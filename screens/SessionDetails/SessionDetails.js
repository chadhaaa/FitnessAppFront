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
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>Day</Text>
        <Text style={{ fontSize: 18 }}>{day}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Hour</Text>
        <Text style={{ fontSize: 18 }}>{hour}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Feedback</Text>
        <Text style={{ fontSize: 18 }}>{feedback}</Text>
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
