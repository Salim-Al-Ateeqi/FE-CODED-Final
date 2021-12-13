import React from "react";
import { observer } from "mobx-react";
import {
	Box,
	Text,
	HStack,
	Pressable,
	VStack,
	Spacer,
	Divider,
	useDisclose,
} from "native-base";
import { Image, TouchableHighlight } from "react-native";
import moment from "moment";

// components
import GroupMenuIcon from "./GroupMenuIcon";

// stores
import { baseURL } from "../../stores/baseURL";

const GroupItem = ({ group, navigation }) => {
	const { isOpen, onOpen, onClose } = useDisclose();
	const updateTime = moment(group.updatedAt).format("LT");

	return (
		<Box>
			<TouchableHighlight
				underlayColor="#DDDDDD"
				activeOpacity={0.9}
				onLongPress={onOpen}
				onPress={() => navigation.navigate("GroupDetail", { group })}
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

						<GroupMenuIcon
							group={group}
							navigation={navigation}
							isOpen={isOpen}
							onOpen={onOpen}
							onClose={onClose}
						/>
					</HStack>
				</Box>
			</TouchableHighlight>
			<Divider />
		</Box>
	);
};

export default observer(GroupItem);
