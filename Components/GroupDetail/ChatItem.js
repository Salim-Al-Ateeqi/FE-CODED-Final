import React from "react";
import { observer } from "mobx-react";
import { HStack, Center, Text, Box } from "native-base";
import { Image } from "react-native";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import { baseURL } from "../../stores/baseURL";
import { Colors } from "../../assets/Theme/Colors";

const ChatItem = ({ chatData, group }) => {
	const userProfile = profileStore.profiles.find(
		(profile) => profile._id === chatData.sentFrom
	);

	return (
		<Box>
			{authStore.user._id === chatData.sentFrom ? (
				<HStack space={2} flex={1} m="4" reversed justifyContent={"flex-end"}>
					<Image
						defaultSource={require("../../assets/Media/defaultUserImage.jpg")}
						style={{ width: 40, height: 40, borderRadius: 50 }}
						alt="Image of the user who sent the message."
						source={{
							uri: baseURL + userProfile.profile.image,
						}}
					/>
					<Center mx="2" bg={Colors.secondary} px={3} borderRadius={50}>
						<Text color={Colors.lightBg}>{chatData.message}</Text>
					</Center>
				</HStack>
			) : (
				<HStack space={2} flex={1} m="4">
					<Image
						defaultSource={require("../../assets/Media/defaultUserImage.jpg")}
						style={{ width: 40, height: 40, borderRadius: 50 }}
						alt="Image of the user who sent the message."
						source={{
							uri: baseURL + userProfile.profile.image,
						}}
					/>
					<Center mx="2" bg={Colors.tertiary} px={3} borderRadius={50}>
						<Text color={Colors.lightBg}>{chatData.message}</Text>
					</Center>
				</HStack>
			)}
		</Box>
	);
};

export default observer(ChatItem);
