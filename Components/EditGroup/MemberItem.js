import React from "react";
import { observer } from "mobx-react";
import { Box, Text, HStack, Pressable, VStack, Divider } from "native-base";
import { Image } from "react-native";

//components
import { Colors } from "../../assets/Theme/Colors";

// stores
import { baseURL } from "../../stores/baseURL";
import profileStore from "../../stores/ProfileStore";

const MemberItem = ({ group, member }) => {
	const groupOwner = profileStore.profiles.find(
		(profile) => profile._id === group.owner
	);

	return (
		<Pressable bg="white">
			<Box flex={1} justifyContent={"center"} pl="5" pr="5" py="2" h={55}>
				<HStack alignItems="center" space={3}>
					<Image
						defaultSource={require("../../assets/Media/defaultUserImage.jpg")}
						borderRadius="50"
						alt="Members Image"
						style={{ width: 40, height: 40, borderRadius: 50 }}
						source={{ uri: baseURL + member.profile.image }}
					/>
					<VStack>
						<Text color={Colors.primary} _dark={{ color: "warmGray.50" }} bold>
							{member.profile.name}
						</Text>
					</VStack>

					{member._id === groupOwner._id && (
						<Text
							fontWeight={"semibold"}
							fontSize={14}
							color={"#8B939C"}
							ml={"auto"}
						>
							Admin
						</Text>
					)}

					{/* maybe we can navigate to user later on */}
					{/* <GroupMenuIcon group={group} navigation={navigation} /> */}
				</HStack>
			</Box>
			<Divider />
		</Pressable>
	);
};

export default observer(MemberItem);
