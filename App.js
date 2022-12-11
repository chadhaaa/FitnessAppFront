import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CrudStatistics from "./screens/crudStatistics/CrudStatistics";
import CrudCompetences from "./screens/CrudCompetences/CrudCompetences";
import CrudDefis from "./screens/crudDefis/crudDefis";
import CrudProgram from "./screens/CrudProgramSeance/crudProgramSeance";
import InvitePlayer from "./screens/invitePlayer/InvitePlayer";
import CrudEvents from "./screens/CrudEvent/crudEvent";
import ViewProfile from "./screens/profilePlayer/ViewProfile";
import UpdateProfile from "./screens/profilePlayer/UpdateProfile";

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
        <Drawer.Screen name="Events" component={CrudEvents} />
        <Drawer.Screen name="View Profile" component={ViewProfile} />
        <Drawer.Screen name="Update Profile" component={UpdateProfile} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
