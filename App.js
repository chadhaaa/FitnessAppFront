import CrudCompetences from "./screens/CrudCompetences/CrudCompetences";
import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />

        <Drawer.Screen name="Competences" component={CrudCompetences} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
