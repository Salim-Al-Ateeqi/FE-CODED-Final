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
} from "native-base";

// components
import GroupItem from "./GroupItem";
import Search from "../Search/";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";
import { socket } from "../../stores/instance";

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
			<GroupItem navigation={navigation} group={group} key={group._id} />
		));

	const handlePress = () => {
		navigation.navigate("CreateGroup");
	};

	return (
		<Box bg="white" flex="1">
			<ScrollView>
				<Divider />
				<VStack mt="1">
					<Search setQuery={setQuery} />
					<HStack justifyContent="space-between">
						<Button colorScheme="darkBlue" variant="link">
							Broadcast List
						</Button>

						<Button colorScheme="darkBlue" variant="link" onPress={handlePress}>
							Create Group
						</Button>
					</HStack>
					<Divider />
				</VStack>

				{groupList}
			</ScrollView>
		</Box>
	);
};

export default observer(Home);
