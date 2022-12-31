import Home from "./screens/home/Home";
import { Link, NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import CrudStatistics from "./screens/crudStatistics/CrudStatistics";
import CrudCompetences from "./screens/CrudCompetences/CrudCompetences";
import CrudDefis from "./screens/crudDefis/crudDefis";
import CrudProgram from "./screens/CrudProgramSeance/crudProgramSeance";
import InvitePlayer from "./screens/invitePlayer/InvitePlayer";
import CrudEvents from "./screens/CrudEvent/crudEvent";
import ViewProfile from "./screens/profilePlayer/ViewProfile";
import UpdateProfile from "./screens/profilePlayer/UpdateProfile";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";

import { useEffect, useState } from "react";
import axios from "axios";

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./redux/Index";

import * as Linking from "expo-linking";

// import BASE_URL from "./Constants/Index";

export const reduxPersistStore = persistStore(reduxStore);

const Drawer = createDrawerNavigator();

const prefix = Linking.makeUrl("/Login");

const App = () => {
  const setUrlConfig = () => {
    console.log("called setUrlConfig");
    axios.defaults.baseURL = "http://192.168.1.197:8000/";
    // axios.defaults.baseURL = BASE_URL
  };

  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Login: "Login",
      },
    },
  };

  function handleDeepLink(event) {
    let data = Linking.parse(event.url);
    setData(data);
  }
  useEffect(() => {
    setUrlConfig();
  }, []);

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setData(Linking.parse(initialURL));
    }
    Linking.addEventListener("url", handleDeepLink);
    if (!data) {
      getInitialURL();
    }
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={reduxPersistStore}>
        <NavigationContainer linking={linking}>
          <Drawer.Navigator
            initialRouteName="Login"
            drawerContent={(props) => {
              const filteredProps = {
                ...props,
                state: {
                  ...props.state,
                  routeNames: props.state.routeNames.filter((routeName) => {
                    routeName !== "Login";
                  }),
                  routes: props.state.routes.filter(
                    (route) => route.name !== "Login"
                  ),
                },
              };
              return (
                <DrawerContentScrollView {...filteredProps}>
                  <DrawerItemList {...filteredProps} />
                </DrawerContentScrollView>
              );
            }}
          >
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, unmountOnBlur: true }}
            />
            <Drawer.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false, drawerLabel: () => null }}
            />
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Statistics" component={CrudStatistics} />
            <Drawer.Screen name="Competences" component={CrudCompetences} />
            <Drawer.Screen name="Invite Player" component={InvitePlayer} />
            <Drawer.Screen name="View Profile" component={ViewProfile} />
            <Drawer.Screen name="Update Profile" component={UpdateProfile} />
            <Drawer.Screen name="Challenges" component={CrudDefis} />
            <Drawer.Screen name="Session Program" component={CrudProgram} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
