import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Signin";
import ValidateToken from "../Authentication/ValidateToken";
import Tabs from "../DrawerNavigation/Tabs";
import AddMembers from "../AddMembers";
import CreateCustomPoll from "../CreateCustomPoll";
import MoviePoll from "../../MoviePoll";
import FinalizeMoviePoll from "../../MoviePoll/FinalizeMoviePoll";

// stores
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";

const RootNavigator = () => {
	const { Navigator, Screen, Group } = createStackNavigator();
	return (
		<Navigator initialRouteName={!authStore.user ? "Signin" : "Tabs"}>
			{authStore.user ? (
				<Screen
					name="Tabs"
					component={Tabs}
					options={{
						headerShown: false,
					}}
				/>
			) : (
				<>
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
				</>
			)}
			<Screen
				name="AddMembers"
				component={AddMembers}
				options={{
					headerShown: false,
				}}
			/>
			<Screen name="CreateCustomPoll" component={CreateCustomPoll} />
			<Screen name="MoviePoll" component={MoviePoll} />

			<Screen name="FinalizeMoviePoll" component={FinalizeMoviePoll} />
		</Navigator>
	);
};
export default observer(RootNavigator);
