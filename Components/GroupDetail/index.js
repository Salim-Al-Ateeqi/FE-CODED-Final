import { observer } from "mobx-react";
import { HStack, KeyboardAvoidingView, Spinner } from "native-base";
import React, { useState } from "react";
import { VStack, Input, Icon, Text, Box, Divider, Heading } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

// components
import { Colors } from "../../utils/Colors";
import ChatItem from "./ChatItem";
import PollItem from "./PollItem";
// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";

const GroupDetail = ({ route, navigation }) => {
	const { group } = route.params;

	if (groupStore.isLoading) {
		return <Spinner />;
	}

	const groupDetailContent = [...group.chat, ...group.polls];

	//create a sort method using moment

	const content = groupDetailContent.map((element) => {
		if (element.contentType === "chat") {
			return <ChatItem key={element._id} chatData={element} />;
		} else if (element.contentType === "poll") {
			return <PollItem key={element._id} pollData={element} />;
		}
	});

	const [newMessage, setNewMessage] = useState("");

	const handleSubmit = () => {
		const message = {
			sentFrom: authStore.user._id,
			message: newMessage,
		};
		groupStore.sendChatToGroup(group._id, message);
		setNewMessage("");
	};

	return (
		<Box flex={1} bg="#fafafa">
			<Divider />

			<VStack mt="5" flex={1}>
				<ScrollView>{content}</ScrollView>
			</VStack>

			<Divider mb="2" />

			<KeyboardAvoidingView>
				<VStack alignItems="center" mb="5">
					<HStack alignItems="center">
						<Input
							color="#fafafa"
							placeholder="Type message"
							placeholderTextColor="#F4F7F5"
							variant="filled"
							bg="#A7A2A9"
							borderRadius="50"
							w="85%"
							py="2"
							px="3"
							mx="1"
							_focus={{ borderColor: Colors.primary }}
							value={newMessage}
							onChangeText={(newMessage) => setNewMessage(newMessage)}
							borderWidth="0"
							InputLeftElement={
								<Icon
									size="sm"
									ml="3"
									color="#3f3f46"
									as={<AntDesign name="pluscircle" />}
								/>
							}
						/>
						<MaterialCommunityIcons
							name="send-circle-outline"
							size={32}
							color={Colors.primary}
							onPress={handleSubmit}
						/>
					</HStack>
				</VStack>
			</KeyboardAvoidingView>
		</Box>
	);
};
export default observer(GroupDetail);
