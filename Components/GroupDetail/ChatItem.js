import React from "react";
import { observer } from "mobx-react";
import { HStack, VStack, Center, Text, Box } from "native-base";
import { Image } from "react-native";

import moment from "moment";

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
					<Center mx="2" bg={Colors.secondary} px={3} borderRadius={10} maxW={250}>
						<VStack>
							<Text color={Colors.primary} fontWeight={"bold"}>	
								{userProfile.profile.name}
							</Text>
							<Text color={Colors.lightBg}>{chatData.message}</Text>
							<Text size={5} width={250} m={2} ml={'auto'}>
								{moment(chatData.createdAt).fromNow()}
							</Text>
						</VStack>
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
					<Center mx="2" bg={Colors.tertiary} px={3} borderRadius={10} maxW={250}>
						<VStack>
							<Text color={Colors.primary} fontWeight={"bold"}>	
								{userProfile.profile.name}
							</Text>
							<Text color={Colors.lightBg}>{chatData.message}</Text>
							<Text size={5} width={250} m={2} ml={'auto'}>
								{moment(chatData.createdAt).fromNow()}
							</Text>
						</VStack>
					</Center>
				</HStack>
			)}
		</Box>
	);
};

export default observer(ChatItem);
