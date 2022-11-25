// import AllCompetences from "./screens/crudCompetence/AllCompetences";
// import AddCompetences from "./screens/crudCompetence/AddCompetence";
// import UpdateCompetences from "./screens/crudCompetence/UpdateCompetence";
// import InvitePlayer from "./screens/invitePlayer/InvitePlayer";
import Home from "./screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CrudStatistics from "./screens/crudStatistics/CrudStatistics";

const Stack = createNativeStackNavigator();
// const tab = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Welcome To Dashboard !" }}
        />
        {/* <Stack.Screen
          name="Competences"
          component={AllCompetences}
          options={{ title: "Welcome To Competences !" }}
        />
        <Stack.Screen name="AddCompetences" component={AddCompetences} />
        <Stack.Screen name="UpdateCompetences" component={UpdateCompetences} />

        <Stack.Screen name="InvitePlayer" component={InvitePlayer} /> */}
        <Stack.Screen name="Statistics" component={CrudStatistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
