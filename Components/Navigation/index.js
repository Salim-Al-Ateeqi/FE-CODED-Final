import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import Home from "../Home";
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Signin";
import ValidateToken from "../Authentication/ValidateToken";
import CreateCustomPoll from "../CreateCustomPoll";
import MoviePoll from "../../MoviePoll";

const RootNavigator = () => {
	const { Navigator, Screen } = createStackNavigator();
	return (
		<Navigator initialRouteName="MoviePoll">
			<Screen name="Home" component={Home} />
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
			<Screen
				name="CreateCustomPoll"
				component={CreateCustomPoll}
			/>
			<Screen
				name="MoviePoll"
				component={MoviePoll}
			/>
		</Navigator>
	);
};

export default RootNavigator;
