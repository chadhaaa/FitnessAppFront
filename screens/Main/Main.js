import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack'
import CrudStatistics from "../crudStatistics/CrudStatistics";
import CrudCompetences from "../CrudCompetences/CrudCompetences";
import CrudDefis from "../crudDefis/crudDefis";
import CrudProgram from "../CrudProgramSeance/crudProgramSeance";
import InvitePlayer from "../invitePlayer/InvitePlayer";
import Home from "../home/Home";
import CrudPlaces from "../CrudPlaces/CrudPlaces";
import PlayerProfile from "../PlayerProfile/playerProfile";
import SessionCancel from "../SessionCancel/sessionCancel";
import SessionFeedback from "../SessionFeedback/sessionFeedback";

import Payment from "../Payment/Payment";
import { useEffect } from "react";





const Drawer = createDrawerNavigator();
const Stack = createStackNavigator()
const Main = () => {
 
  return (
    <NavigationContainer independent={true}>
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
            <Drawer.Screen name="Session Feedback" component={SessionFeedback} />
            <Drawer.Screen name="Payment" component={Payment} />


        </Drawer.Navigator> 
    </NavigationContainer>
  );
};
export default Main;
