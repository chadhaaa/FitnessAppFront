import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CrudStatistics from "./screens/crudStatistics/CrudStatistics";
import CrudCompetences from "./screens/CrudCompetences/CrudCompetences";
import CrudDefis from "./screens/crudDefis/crudDefis";
import CrudProgram from "./screens/CrudProgramSeance/crudProgramSeance";
import InvitePlayer from "./screens/invitePlayer/InvitePlayer";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";

import { useEffect } from "react";
import axios from "axios";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./redux/Index";

// import BASE_URL from "./Constants/Index";

export const reduxPersistStore = persistStore(reduxStore);

const Drawer = createDrawerNavigator();

const App = () => {
  const setUrlConfig = () => {
    console.log("called setUrlConfig");
    axios.defaults.baseURL = "http://192.168.1.197:8000/";
    // axios.defaults.baseURL = BASE_URL
  };

  useEffect(() => {
    setUrlConfig();
  }, []);

  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistStore}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Statistics" component={CrudStatistics} />
            <Drawer.Screen name="Competences" component={CrudCompetences} />
            <Drawer.Screen name="Invite Player" component={InvitePlayer} />
            <Drawer.Screen name="Challenges" component={CrudDefis} />
            <Drawer.Screen name="Session Program" component={CrudProgram} />
            <Drawer.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
