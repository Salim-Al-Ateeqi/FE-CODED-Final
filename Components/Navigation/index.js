import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Signin";
import ValidateToken from "../Authentication/ValidateToken";
import Tabs from "../DrawerNavigation/Tabs";

const RootNavigator = () => {

	const { Navigator, Screen } = createStackNavigator();
	return (
		<Navigator initialRouteName="Tabs">
			<Screen
				name="Tabs"
				component={Tabs}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name="Signup"
				component={Signup}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name="Signin"
				component={Signin}
				options={{
					headerShown: false,
				}}
			/>
			<Screen
				name="ValidateToken"
				component={ValidateToken}
				options={{
					headerShown: false,
				}}
			/>
		</Navigator>
	);

export default RootNavigator;
