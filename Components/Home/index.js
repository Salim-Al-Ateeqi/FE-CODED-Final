import React, { useState } from "react";
import { observer } from "mobx-react";
import {
	ScrollView,
	Spinner,
	Box,
	Divider,
	VStack,
	HStack,
	Button,
	Text,
} from "native-base";
import { TouchableOpacity } from "react-native";

// components
import GroupItem from "./GroupItem";
import Search from "../Search/";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";
import { socket } from "../../stores/instance";
import { Colors } from "../../assets/Theme/Colors";

const Home = ({ navigation }) => {
	const [query, setQuery] = useState("");

	if (groupStore.isLoading) {
		return <Spinner />;
	}

	const user = authStore.user ?? "";

	const data = authStore.user;
	socket.emit("authUser", data);

	const groupList = groupStore.groups
		.filter((_group) => _group.name.toLowerCase().includes(query.toLowerCase()))
		.filter((__group) => __group.members.includes(user._id))
		.map((group) => (
			<GroupItem key={group._id} navigation={navigation} group={group} />
		));

	const handlePress = () => {
		navigation.navigate("CreateGroup");
	};

	return (
		<Box bg="white" flex="1" mb={2}>
			<ScrollView>
				<Divider />
				<VStack mt="1">
					<Search setQuery={setQuery} />
					<HStack
						justifyContent="space-between"
						alignItems={"center"}
						mx={4}
						my={2}
					>
						<TouchableOpacity activeOpacity={0.7}>
							<Text fontWeight={"semibold"} underline color={Colors.secondary}>
								Broadcast List
							</Text>
						</TouchableOpacity>

						<TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
							<Text fontWeight={"semibold"} underline color={Colors.secondary}>
								Create Group
							</Text>
						</TouchableOpacity>
					</HStack>
					<Divider />
				</VStack>

				{groupList}
			</ScrollView>
		</Box>
	);
};

export default observer(Home);
