import React, { useState } from "react";
import { observer } from "mobx-react";
import {
	Text,
	VStack,
	ScrollView,
	Button,
	Box,
	Divider,
	useToast,
	HStack,
} from "native-base";

// components
import { Colors } from "../../assets/Theme/Colors";
import MemberItem from "./MemberItem";
import ImageEditGroup from "./ImageEditGroup";
import InputEditGroup from "./InputEditGroup";

// stores
import profileStore from "../../stores/ProfileStore";
import groupStore from "../../stores/groupStore";

const EditGroup = ({ route, navigation }) => {
	const [focusOnInput, setFocusOnInput] = useState(false);
	const [imageChanged, setImageChanged] = useState(false);
	const [updatedGroup, setUpdatedGroup] = useState({
		name: "",
		image: "",
	});

	const { group } = route.params;
	const toast = useToast();

	const groupMembers = profileStore.profiles
		.filter((profile) => group.members.includes(profile._id))
		.map((member) => <MemberItem key={member._id} member={member} />);

	const handleUpdate = async () => {
		groupStore.updateGroup(group._id, updatedGroup, navigation, toast);
		setImageChanged(false);
	};

	return (
		<Box flex="1" w="100%" bg="#fff">
			<ScrollView>
				<ImageEditGroup
					group={group}
					updatedGroup={updatedGroup}
					imageChanged={imageChanged}
					setImageChanged={setImageChanged}
				/>

				<VStack flex={1} space="5">
					<InputEditGroup
						group={group}
						updatedGroup={updatedGroup}
						focusOnInput={focusOnInput}
						handleUpdate={handleUpdate}
					/>

					<Button
						alignSelf={"center"}
						w="25%"
						onPress={handleUpdate}
						style={{ backgroundColor: Colors.primary }}
						_text={{
							color: "#fff",
						}}
					>
						Save
					</Button>

					<VStack mb={5}>
						<HStack w="100%">
							<Text ml="5" mb="2">
								{group.members.length} PARTICIPANTS
							</Text>
						</HStack>
						<Divider />
						{groupMembers}
					</VStack>
				</VStack>
			</ScrollView>
		</Box>
	);
};

export default observer(EditGroup);
