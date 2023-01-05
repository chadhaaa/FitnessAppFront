import { View, Text, ScrollView } from "react-native";
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
    <ScrollView>
      <View>
        <Text style={{ fontSize: 40 }}>Session Details</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>Date : </Text>
        <Text style={{ fontSize: 18 }}>{day}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>Hour : </Text>
        <Text style={{ fontSize: 18 }}>{hour}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>
          Cancellation :{" "}
        </Text>
        <Text>{cancellation}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>Reason : </Text>
        <Text style={{ fontSize: 18 }}>{reason}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>Feedback : </Text>
        <Text style={{ fontSize: 18 }}>{feedback}</Text>
      </View>
    </ScrollView>
  );
};

export default OneSeance;
