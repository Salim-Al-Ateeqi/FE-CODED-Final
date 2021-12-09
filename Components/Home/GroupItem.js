import React from "react";
import { observer } from "mobx-react";
import {
	Box,
	Text,
	HStack,
	Pressable,
	Avatar,
	VStack,
	Spacer,
	Divider,
} from "native-base";
import { Image } from "react-native";
import moment from "moment";

// components
import GroupMenuIcon from "./GroupMenuIcon";

// stores
import { baseURL } from "../../stores/baseURL";

const GroupItem = ({ group, navigation }) => {
	const updateTime = moment(group.updatedAt).format("LT");

	return (
		<Box>
			<Pressable
				onPress={() => navigation.navigate("GroupDetail", { group })}
				bg="white"
			>
				<Box pl="4" pr="5" py="2">
					<HStack alignItems="center" space={3}>
						<Image
							borderRadius="50"
							alt="Members Image"
							style={{ width: 48, height: 48, borderRadius: 50 }}
							source={{ uri: baseURL + group.image }}
						/>

						<VStack>
							<Text color="coolGray.800" _dark={{ color: "warmGray.50" }} bold>
								{group.name}
							</Text>
						</VStack>
						<Spacer />

						<Text>{updateTime}</Text>

						<GroupMenuIcon group={group} navigation={navigation} />
					</HStack>
				</Box>
				<Divider />
			</Pressable>
		</Box>
	);
};

export default observer(GroupItem);
