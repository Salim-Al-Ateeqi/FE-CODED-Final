import React, { useState, useEffect } from "react";
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
} from "native-base";
import { Image } from "react-native";
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
	const [imageChanged, setImageChanged] = useState(false);
	const [updatedGroup, setUpdatedGroup] = useState({
		name: "",
		image: "",
	});

	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			}
		})();
	}, []);

	const { group } = route.params;
	const defaultImage = `/media/defaultUserImage.jpg`;

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
				setUpdatedGroup({ ...group.image, image: image });
				setImageChanged(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdate = async () => {
		groupStore.updateGroup(group._id, updatedGroup, navigation, toast);
		setImageChanged(false);
	};
	return (
		<Box flex="1" w="100%" bg="#fff">
			<ScrollView>
				<VStack mt="10" mb="7" mx="1">
					<Center space="3">
						<Pressable onPress={_pickImage}>
							{group.image ? (
								!imageChanged ? (
									<Image
										style={{ width: 120, height: 120, borderRadius: 100 }}
										alt="Group Image"
										source={{
											uri: baseURL + group.image,
										}}
									/>
								) : (
									<Image
										style={{ width: 120, height: 120, borderRadius: 100 }}
										alt="Group Image"
										source={{
											uri: updatedGroup.image.uri,
										}}
									/>
								)
							) : (
								<Image
									style={{ width: 120, height: 120, borderRadius: 100 }}
									alt="Group Image"
									source={{
										uri: baseURL + defaultImage,
									}}
								/>
							)}
						</Pressable>
					</Center>
				</VStack>

				<VStack flex={1} space="5">
					<FormControl>
						<FormControl.Label ml="3">Group Name</FormControl.Label>
						<HStack justifyContent="space-evenly">
							<Input
								w="100%"
								_focus={{ borderColor: Colors.primary }}
								variant={"underlined"}
								defaultValue={group.name}
								placeholder="Edit your name"
								InputLeftElement={
									<Icon
										as={<MaterialIcons name="group" />}
										size={5}
										ml="3"
										color="muted.400"
									/>
								}
								onChangeText={(name) =>
									setUpdatedGroup({ ...group.name, name })
								}
							/>
						</HStack>
					</FormControl>
					<Button
						alignSelf={"center"}
						w="40%"
						onPress={handleUpdate}
						style={{ backgroundColor: Colors.primary }}
						_text={{
							color: "#fff",
						}}
					>
						Update Profile
					</Button>

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
