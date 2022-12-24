import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CrudStatistics from "./screens/crudStatistics/CrudStatistics";
import CrudCompetences from "./screens/CrudCompetences/CrudCompetences";
import CrudDefis from "./screens/crudDefis/crudDefis";
import CrudProgram from "./screens/CrudProgramSeance/crudProgramSeance";
import InvitePlayer from "./screens/invitePlayer/InvitePlayer";

import CrudPlaces from "./screens/CrudPlaces/CrudPlaces";
import PlayerProfile from "./screens/PlayerProfile/playerProfile";
import SessionCancel from "./screens/SessionCancel/sessionCancel";
import Login from "./screens/Login/Login";
import Signup from "./screens/Signup/Signup";




const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Statistics" component={CrudStatistics} />
        <Drawer.Screen name="Competences" component={CrudCompetences} />
        <Drawer.Screen name="Invite Player" component={InvitePlayer} />
        <Drawer.Screen name="Challenges" component={CrudDefis} />
        <Drawer.Screen name="Session Program" component={CrudProgram} />

        <Drawer.Screen name="Places" component={CrudPlaces} />
        <Drawer.Screen name="Profile" component={PlayerProfile} />
        <Drawer.Screen name="Session Cancel" component={SessionCancel} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
