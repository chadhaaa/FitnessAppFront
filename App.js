import Home from "./screens/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CrudStatistics from "./screens/crudStatistics/CrudStatistics";
import CrudCompetences from "./screens/CrudCompetences/CrudCompetences";
import CrudDefis from "./screens/crudDefis/crudDefis";
import CrudProgram from "./screens/CrudProgramSeance/crudProgramSeance";
import InvitePlayer from "./screens/invitePlayer/InvitePlayer";
import UpdateSession from "./screens/updateSession/UpdateSession";
import GetSessionDetail from "./screens/updateSession/GetOneSession";
import GetAllSessions from "./screens/updateSession/GetAllSessions";

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
        <Drawer.Screen name="Update Session" component={UpdateSession} />

        {/* coach route sessions + update  */}
        <Drawer.Screen
          name="Session Detail (coach)"
          component={GetSessionDetail}
        />
        <Drawer.Screen
          name="List of Sessions (coach)"
          component={GetAllSessions}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
