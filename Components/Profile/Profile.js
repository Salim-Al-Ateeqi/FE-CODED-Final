import React from "react";
import { View, Text } from "native-base";

// stores
import profileStore from "../../stores/ProfileStore";
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";

const Profile = () => {
	const userProfile = profileStore.findProfile(authStore.user._id);

	return (
		<View>
			<Text>{userProfile.phoneNumber}</Text>
		</View>
	);
};

export default observer(Profile);
