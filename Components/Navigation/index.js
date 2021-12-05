import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import Home from "../Home";
import Signup from "../Authentication/Signup";

const RootNavigator = () => {
	const { Navigator, Screen } = createStackNavigator();
	return (
		<Navigator initialRouteName="Signup">
			<Screen name="Home" component={Home} />
			<Screen
				name="Signup"
				component={Signup}
				options={{
					headerShown: false,
				}}
			/>
		</Navigator>
	);
};

export default RootNavigator;
