import { View, Text } from "react-native";
import React from "react";
import { useState } from "react";
import axios from "axios";

const OneSeance = ({
  day,
  idPlace,
  cancellation,
  reason,
  feedback,
  hour,
  programId,
}) => {
  return (
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
  );
};

export default OneSeance;
