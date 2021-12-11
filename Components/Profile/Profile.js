import React, { useState, useEffect } from "react";
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
	Badge,
} from "native-base";
import { Image, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { observer } from "mobx-react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

// components
import { Colors } from "../../utils/Colors";

// stores
import profileStore from "../../stores/ProfileStore";
import authStore from "../../stores/authStore";
import { baseURL } from "../../stores/baseURL";

const Profile = () => {
	const [imageChanged, setImageChanged] = useState(false);
	const [updateProfile, setUpdateProfile] = useState({
		name: "",
		image: "",
		status: "",
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

	if (!authStore.user) {
		return <Text>Obs! Error occur, please refresh the App!</Text>;
	}

	const userProfile = profileStore.profiles.find(
		(_profile) => _profile._id === authStore.user._id
	);

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
				const match = /\.(\w+)$/.exec(filename);
				const image = {
					uri: localUri,
					name: filename,
					type: match ? `image/${match[1]}` : `image`,
				};
				setUpdateProfile({ ...userProfile.profile, image: image });
				setImageChanged(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = () => {
		profileStore.updateProfile(userProfile._id, updateProfile);
		setImageChanged(false);
	};

	return (
		<Box flex="1" w="100%" bg="#f5f5f5">
			<ScrollView>
				<VStack mt="10" mb="2" mx="1" alignItems="center">
					<Pressable onPress={_pickImage}>
						{!imageChanged ? (
							<Box position={"relative"}>
								<Badge
									position={"absolute"}
									top={83}
									p={1}
									rounded={50}
									alignSelf="flex-end"
									zIndex={1}
									colorScheme="coolGray"
								>
									<Icon
										as={<MaterialIcons name="edit" />}
										size={6}
										color="muted.400"
									/>
								</Badge>
								<Image
									style={{ width: 120, height: 120, borderRadius: 100 }}
									source={{ uri: baseURL + userProfile.profile.image }}
								/>
							</Box>
						) : (
							<Box position={"relative"}>
								<Badge
									position={"absolute"}
									top={83}
									p={1}
									rounded={50}
									alignSelf="flex-end"
									zIndex={1}
									colorScheme="coolGray"
								>
									<Icon
										as={<MaterialIcons name="edit" />}
										size={6}
										color="muted.400"
									/>
								</Badge>
								<Image
									style={{ width: 120, height: 120, borderRadius: 100 }}
									source={{ uri: updateProfile.image.uri }}
								/>
							</Box>
						)}
					</Pressable>
					<Text fontSize="18" bold my="1">
						{userProfile.profile.name}
					</Text>
					<Text fontSize="14" my="1">
						{userProfile.profile.status}
					</Text>
				</VStack>

				<KeyboardAvoidingView keyboardVerticalOffset={5}>
					<VStack>
						<Center>
							<FormControl w="100%" mb="2">
								<FormControl.Label ml="3">Name</FormControl.Label>
								<Input
									variant={"underlined"}
									_focus={{ borderColor: Colors.primary }}
									defaultValue={userProfile.profile.name}
									placeholder="Edit your name"
									InputLeftElement={
										<Icon
											as={<MaterialIcons name="person" />}
											size={5}
											ml="3"
											color="muted.400"
										/>
									}
									InputRightElement={
										<Icon
											as={<MaterialIcons name="edit" />}
											mr="3"
											size={5}
											color="muted.400"
										/>
									}
									onChangeText={(name) =>
										setUpdateProfile({ ...userProfile.profile, name: name })
									}
								/>
							</FormControl>

							<FormControl w="100%" my="2">
								<FormControl.Label ml="3">Status</FormControl.Label>
								<Input
									variant={"underlined"}
									_focus={{ borderColor: Colors.primary }}
									defaultValue={userProfile.profile.status}
									placeholder="Edit your status"
									InputLeftElement={
										<Icon
											as={<AntDesign name="profile" />}
											size={5}
											ml="3"
											color="muted.400"
										/>
									}
									InputRightElement={
										<Icon
											as={<MaterialIcons name="edit" />}
											mr="3"
											size={5}
											color="muted.400"
										/>
									}
									onChangeText={(status) =>
										setUpdateProfile({ ...userProfile.profile, status })
									}
								/>
							</FormControl>
						</Center>
					</VStack>
				</KeyboardAvoidingView>
				<Button
					onPress={handleSubmit}
					m="5"
					alignSelf="center"
					w="40%"
					style={{ backgroundColor: Colors.primary }}
					_text={{
						color: "#fff",
					}}
				>
					Update Profile
				</Button>
			</ScrollView>
		</Box>
	);
};

export default observer(Profile);
