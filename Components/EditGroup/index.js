import React, { useState } from "react";
import {
	Avatar,
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
	KeyboardAvoidingView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// components
import { Colors } from "../../utils/Colors";

// stores
import groupStore from "../../stores/groupStore";
import { baseURL } from "../../stores/baseURL";

const EditGroup = ({ route, navigation }) => {
	const { group } = route.params;

	const [updatedGroup, setUpdatedGroup] = useState({
		name: group.name,
		image: group.image,
	});

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
		<Box flex="1" w="100%" bg="#f5f5f5">
			<ScrollView>
				<VStack mt="10" mb="2" mx="1">
					<Center space="3">
						<Pressable onPress={_pickImage}>
							<VStack position="relative">
								<Text
									position="absolute"
									top={70}
									left="23"
									zIndex={1}
									color="#737373"
									fontSize="15"
								>
									Edit Image
								</Text>
								<Avatar
									size={120}
									source={{
										uri: baseURL + group.image,
									}}
								/>
							</VStack>
						</Pressable>

						<Text fontSize="18" bold my="1">
							{group.name}
						</Text>
					</Center>
				</VStack>

				<Divider mb="5" />
				<KeyboardAvoidingView keyboardVerticalOffset={5}>
					<VStack>
						{/* <Heading size="md" mx="5">
            Edit Profile
          </Heading> */}
						<Center>
							<FormControl w="90%">
								<FormControl.Label>Name</FormControl.Label>
								<Input
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
							</FormControl>
						</Center>
					</VStack>
				</KeyboardAvoidingView>
				<Button
					onPress={handleUpdate}
					m="5"
					alignSelf="center"
					w="25%"
					style={{ backgroundColor: Colors.Primary }}
					_text={{
						color: "#fff",
					}}
				>
					Update
				</Button>
			</ScrollView>
		</Box>
		// <Box>
		// 	<FormControl>
		// 		<FormControl.Label>Updated Group Name:</FormControl.Label>
		// 		<Input
		// 			onChangeText={(name) => setUpdatedGroup({ ...updatedGroup, name })}
		// 			placeholder="Please enter a new group name!"
		// 		/>
		// 	</FormControl>
		// 	<FormControl>
		// 		<FormControl.Label>Choose An Image to Upload</FormControl.Label>
		// 		<Button onPress={_pickImage} variant="outline" colorScheme="success">
		// 			Upload Image
		// 		</Button>
		// 	</FormControl>

		// 	<FormControl>
		// 		<FormControl.Label>Updated Description:</FormControl.Label>
		// 		<Input
		// 			onChangeText={(description) =>
		// 				setUpdatedGroup({ ...updatedGroup, description })
		// 			}
		// 			placeholder="Please enter a new group description!"
		// 		/>
		// 	</FormControl>
		// 	<Button
		// 		mt="2"
		// 		colorScheme="indigo"
		// 		onPress={handleUpdate}
		// 		variant="outline"
		// 	>
		// 		Update Group
		// 	</Button>
		// </Box>
	);
};

export default EditGroup;
