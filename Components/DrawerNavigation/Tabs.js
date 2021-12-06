import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Box, Center } from "native-base";

// components
import CustomDrawerContent from "./CustomDrawerContent";

// screens
import Home from "../Home/index";
import Search from "../Search/Search";
import Profile from "../Profile/Profile";

// stores
import authStore from "../../stores/authStore";

const Drawer = createDrawerNavigator();

function Component(props) {
	return <Center></Center>;
}

function Logout(props) {
	authStore.logout();
}

const Tabs = ({ navigation }) => {
	return (
		<Box flex={1}>
			<Drawer.Navigator
				drawerContent={(props) => <CustomDrawerContent {...props} />}
			>
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="Profile" component={Profile} />
				<Drawer.Screen name="Archive" component={Component} />
				<Drawer.Screen name="Trash" component={Component} />
				<Drawer.Screen name="Logout" component={Logout} />
			</Drawer.Navigator>
		</Box>
	);
};

export default Tabs;
