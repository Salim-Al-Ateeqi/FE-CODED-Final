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
	const userProfile = authStore.user
		? profileStore.profiles.find(
				(_profile) => _profile._id === authStore.user._id
		  )
		: null;

	const [updateProfile, setUpdateProfile] = useState({
		name: authStore.user ? userProfile.profile.name : "",
		image: authStore.user ? userProfile.profile.image : "",
		status: authStore.user ? userProfile.profile.status : "",
	});

	if (!authStore.user) {
		return <Text>Sign in please</Text>;
	}

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
				setUpdateProfile({ ...updateProfile, image: image });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = () => {
		profileStore.updateProfile(userProfile._id, updateProfile);
		console.log(updateProfile);
	};

	return (
		<Box flex="1" w="100%" bg="#f5f5f5">
			<ScrollView>
				<VStack mt="10" mb="2" mx="1" alignItems="center">
					<Pressable onPress={_pickImage}>
						<Image
							style={{ width: 120, height: 120, borderRadius: 100 }}
							source={{ uri: baseURL + userProfile.profile.image }}
						/>
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
							<FormControl w="90%" mb="2">
								<FormControl.Label>Name</FormControl.Label>
								<Input
									_focus={{ borderColor: Colors.Primary }}
									defaultValue={userProfile.profile.name}
									placeholder="Edit your name"
									InputLeftElement={
										<Icon
											as={<MaterialIcons name="person" />}
											size={5}
											ml="2"
											color="muted.400"
										/>
									}
									onChangeText={(name) =>
										setUpdateProfile({ ...updateProfile, name: name })
									}
								/>
							</FormControl>

							<FormControl w="90%" my="2">
								<FormControl.Label>Status</FormControl.Label>
								<Input
									_focus={{ borderColor: Colors.Primary }}
									defaultValue={userProfile.profile.status}
									placeholder="Edit your status"
									InputLeftElement={
										<Icon
											as={<AntDesign name="profile" />}
											size={5}
											ml="2"
											color="muted.400"
										/>
									}
									onChangeText={(status) =>
										setUpdateProfile({ ...updateProfile, status })
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
	);
};

export default observer(Profile);
