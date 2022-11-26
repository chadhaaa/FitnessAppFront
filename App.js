import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CrudStatistics from "./screens/crudStatistics/CrudStatistics";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Statistics" component={CrudStatistics} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
