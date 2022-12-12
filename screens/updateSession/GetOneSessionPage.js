import { View, Text, ScrollView } from "react-native";
import React from "react";

const OneSeance = ({ day, cancellation, reason, feedback, hour }) => {
  return (
    <ScrollView>
      <View>
        <Text>Session Details</Text>
        <Text>Date : </Text>
        <Text>{day}</Text>
        <Text>Hour : </Text>
        <Text>{hour}</Text>
        <Text>Cancellation : </Text>
        <Text>{cancellation}</Text>
        <Text>Reason : </Text>
        <Text>{reason}</Text>
        <Text>Feedback : </Text>
        <Text>{feedback}</Text>
      </View>
    </ScrollView>
  );
};

export default OneSeance;
