import React from "react";
import { View, Text } from "native-base";

// stores
import profileStore from "../../stores/ProfileStore";
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";

const Profile = () => {
	const userProfile = profileStore.profiles.find(
		(_profile) => _profile._id === authStore.user._id
	);
	console.log(userProfile);
	return (
		<View>
			<Text>{userProfile.profile.name}</Text>
		</View>
	);
};

export default observer(Profile);
