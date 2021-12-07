import React from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { Box } from "native-base";
import { observer } from "mobx-react";

// components
import CustomDrawerContent from "./CustomDrawerContent";

// screens
import Home from "../Home/index";
import Profile from "../Profile/Profile";
import CreateCustomPoll from "../CreateCustomPoll";
import MoviePoll from "../../MoviePoll";
import FinalizeMoviePoll from "../../MoviePoll/FinalizeMoviePoll";
import AddMembers from "../AddMembers";
// stores
import authStore from "../../stores/authStore";

const Drawer = createDrawerNavigator();

const Tabs = ({ navigation }) => {
	return (
		<Box flex={1}>
			<Drawer.Navigator
				initialRouteName={Home}
				drawerContent={(props) => <CustomDrawerContent {...props} />}
			>
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="Profile" component={Profile} />
				<Drawer.Screen name="CreateCustomPoll" component={CreateCustomPoll} />
				<Drawer.Screen name="MoviePoll" component={MoviePoll} />
				<Drawer.Screen
				name="AddMembers"
				component={AddMembers}
				options={{
					headerShown: false,
				}}
			/>

				<Drawer.Screen name="FinalizeMoviePoll" component={FinalizeMoviePoll} />


				
			</Drawer.Navigator>
		</Box>
	);
};

export default observer(Tabs);
