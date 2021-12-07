import React, { useState } from "react";
import {
	Avatar,
	Box,
	Center,
	HStack,
	Icon,
	Input,
	Text,
	VStack,
	FormControl,
	ScrollView,
	Heading,
	Pressable,
	Button,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { observer } from "mobx-react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

	// useEffect(() => {
	// 	(async () => {
	// 		if (Platform.OS !== "web") {
	// 			const { status } =
	// 				await ImagePicker.requestMediaLibraryPermissionsAsync();
	// 			if (status !== "granted") {
	// 				alert("Sorry, we need camera roll permissions to make this work!");
	// 			}
	// 		}
	// 	})();
	// }, []);

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
		<VStack flex="1" w="100%" bg="#f5f5f5">
			<KeyboardAwareScrollView>
				<ScrollView>
					<VStack mt="10" mb="5" mx="1">
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
											uri: baseURL + userProfile.profile.image,
										}}
									/>
								</VStack>
							</Pressable>
							<Text fontSize="18" bold my="1">
								{userProfile.profile.name}
							</Text>
							<Text fontSize="14" my="1">
								{userProfile.profile.status}
							</Text>
						</Center>
					</VStack>

					<VStack>
						{/* <Heading size="md" mx="5">
							Edit Profile
						</Heading> */}
						<Center>
							<FormControl w="90%">
								<FormControl.Label>Name</FormControl.Label>
								<Input
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
										setUpdateProfile({ ...updateProfile, name })
									}
								/>
							</FormControl>

							<FormControl w="90%" my="2">
								<FormControl.Label>Status</FormControl.Label>
								<Input
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
					<Button
						onPress={handleSubmit}
						m="5"
						alignSelf="center"
						w="25%"
						colorScheme="darkBlue"
						_text={{
							color: "#fff",
						}}
					>
						Update
					</Button>
				</ScrollView>
			</KeyboardAwareScrollView>
		</VStack>
	);
};

export default observer(Profile);
