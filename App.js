import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack'
import Main from "./screens/Main/Main";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";
import FirstLogin from "./screens/FirstLogin/FirstLogin";




const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()
const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="First Login" component={FirstLogin}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Main" component={Main} />
        
      </Stack.Navigator>

    </NavigationContainer>
  );
};
export default App;
