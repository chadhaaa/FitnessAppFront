import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { styles } from "./Styles";
import { useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import Icon from "react-native-vector-icons/dist/Ionicons";

const Login = () => {
  const {
    colors: { background },
  } = useTheme();

  useEffect(() => {}, []);
  return (
    <View style={styles(background).loginMain}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View>
          <Text> Welcome to FitnessApp</Text>
          <Text> Sign In to Access your Account !</Text>
        </View>
        <View>
          <View>
            <View>
              <TextInput
                placeholder="Enter your Email"
                keyboardType="email-address"
              />
            </View>
            <View>
              <View>
                <View>
                  <TextInput
                    placeholder="Enter your Password"
                    secureTextEntry={true}
                  />
                </View>
                <TouchableOpacity>
                  <Icon name="key-outline" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Text>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <Text>No account ? Register here</Text>
            <TouchableOpacity>
              <Text>Sign Up !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
