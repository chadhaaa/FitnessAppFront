import CrudCompetences from "./screens/CrudCompetences/CrudCompetences";
import Home from "./screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Welcome To Dashboard !" }}
        />

        <Stack.Screen name="Competences" component={CrudCompetences} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
