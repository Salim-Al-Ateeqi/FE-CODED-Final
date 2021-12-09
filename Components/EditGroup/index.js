import React, { useState } from "react";
import { observer } from "mobx-react";
import {
	Center,
	Icon,
	Input,
	Text,
	VStack,
	FormControl,
	ScrollView,
	Pressable,
	Button,
	Box,
	Divider,
	useToast,
	HStack,
	Image,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// components
import { Colors } from "../../utils/Colors";
import ViewMembers from "./ViewMembers";

// stores
import profileStore from "../../stores/ProfileStore";
import groupStore from "../../stores/groupStore";
import { baseURL } from "../../stores/baseURL";

const EditGroup = ({ route, navigation }) => {
	const { group } = route.params;
	const [updatedGroup, setUpdatedGroup] = useState({
		name: group.name,
		image: group.image,
	});

	const groupMembers = profileStore.profiles
		.filter((profile) => group.members.includes(profile._id))
		.map((member) => <ViewMembers key={member._id} member={member} />);

	const toast = useToast();

	const _pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.cancelled) {
				const localUri = result.uri;
				const filename = localUri.split("/").pop();
				const match = /.(\w+)$/.exec(filename);
				const image = {
					uri: localUri,
					name: filename,
					type: match ? `image/${match[1]}` : image,
				};
				setUpdatedGroup({ ...updatedGroup, image: image });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		groupStore.updateGroup(group._id, updatedGroup, navigation, toast);
	};
	return (
		<Box flex="1" w="100%" bg="#fff">
			<ScrollView>
				<VStack mt="10" mb="2" mx="1">
					<Center space="3">
						<Pressable onPress={_pickImage}>
							<Image
								style={{ width: 120, height: 120, borderRadius: 100 }}
								alt="Group Image"
								source={{
									uri: baseURL + group.image,
								}}
							/>
						</Pressable>

						<Text fontSize="18" bold my="3">
							{group.name}
						</Text>
					</Center>
				</VStack>

				<Divider mb="5" />

				<VStack flex={1} space="5">
					<FormControl>
						<FormControl.Label ml="3">Change Group Name</FormControl.Label>
						<HStack justifyContent="space-evenly">
							<Input
								w="75%"
								_focus={{ borderColor: Colors.Primary }}
								defaultValue={group.name}
								placeholder="Edit your name"
								InputLeftElement={
									<Icon
										as={<MaterialIcons name="group" />}
										size={5}
										ml="2"
										color="muted.400"
									/>
								}
								onChangeText={(name) =>
									setUpdatedGroup({ ...updatedGroup, name })
								}
							/>
							<Button
								onPress={handleUpdate}
								style={{ backgroundColor: Colors.Primary }}
								_text={{
									color: "#fff",
								}}
							>
								Change
							</Button>
						</HStack>
					</FormControl>
					<VStack>
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
