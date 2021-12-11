import React from "react";
import { observer } from "mobx-react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Signin";
import Tabs from "../DrawerNavigation/Tabs";
import ValidateToken from "../Authentication/ValidateToken";
import CreateCustomPoll from "../CreateCustomPoll";
import MoviePoll from "../MoviePoll";
import FinalizeMoviePoll from "../MoviePoll/FinalizeMoviePoll";
import AddMembers from "../AddMembers";
import EditGroup from "../EditGroup";
import GroupDetail from "../GroupDetail";
import MenuIcon from "../GroupDetail/MenuIcon";
import GroupLeftImage from "../GroupDetail/GroupLeftImage";
import CreateGroup from "../CreateGroup";

// stores
import authStore from "../../stores/authStore";

const RootNavigator = () => {
	const { Navigator, Screen } = createStackNavigator();
	return (
		<Navigator>
			{!authStore.user || !authStore.user.isValidated ? (
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
							headerShown: true,
						}}
					/>
				</>
			) : (
				<>
					<Screen
						name="Tabs"
						component={Tabs}
						options={{
							headerShown: false,
						}}
					/>
					<Screen name="CreateCustomPoll" component={CreateCustomPoll} />
					<Screen
						name="AddMembers"
						component={AddMembers}
						options={{
							headerShown: true,
							headerTitle: "Add Members",
						}}
					/>
					<Screen
						name="EditGroup"
						component={EditGroup}
						options={({ route, navigation }) => {
							const { group } = route.params;
							return {
								headerTitle: `${group.name} info`,
							};
						}}
					/>
					<Screen
						name="MoviePoll"
						component={MoviePoll}
						options={{
							headerShown: true,
							headerTitle: "Movie Poll",
						}}
					/>
					<Screen
						name="GroupDetail"
						component={GroupDetail}
						options={({ route, navigation }) => {
							const { group } = route.params;
							return {
								headerTitle: () => (
									<GroupLeftImage navigation={navigation} group={group} />
								),
								headerRight: () => (
									<MenuIcon navigation={navigation} group={group} />
								),
							};
						}}
					/>
					<Screen
						name="CreateGroup"
						component={CreateGroup}
						options={{
							headerShown: true,
						}}
					/>
					<Screen name="FinalizeMoviePoll" component={FinalizeMoviePoll} />
				</>
			)}
		</Navigator>
	);
};
export default observer(RootNavigator);
