import React from "react";
import { observer } from "mobx-react";
import { Box, VStack, Text, HStack } from "native-base";
import { Image } from "react-native";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import { baseURL } from "../../stores/baseURL";

const DrawerProfile = () => {
	if (!authStore.user) {
		return <Text>You need to sign in.</Text>;
	}

	const userProfile = profileStore.profiles.find(
		(_profile) => _profile._id === authStore.user._id
	);

	return (
		<Box px="3">
			{userProfile ? (
				<HStack>
					<Image
						source={{
							uri: baseURL + userProfile.profile.image,
						}}
						style={{ width: 60, height: 60, borderRadius: 100 }}
					/>
					<VStack mx="3">
						<Text bold color="gray.700">
							{userProfile.profile.name}
						</Text>
						<Text fontSize="13" mt="1" color="gray.500" fontWeight="500">
							{userProfile.profile.status}
						</Text>
						<Text fontSize="12" mt="1" color="gray.500" fontWeight="500">
							{userProfile.phoneNumber}
						</Text>
					</VStack>
				</HStack>
			) : (
				<Text>Refresh The App please.</Text>
			)}
		</Box>
	);
};

export default observer(DrawerProfile);
