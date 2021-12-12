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
	useToast,
} from "native-base";
import { KeyboardAvoidingView } from "react-native";
import { observer } from "mobx-react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

// components
import { Colors } from "../../assets/Theme/Colors";
import ImageProfile from "./ImageProfile";

// stores
import profileStore from "../../stores/ProfileStore";
import authStore from "../../stores/authStore";

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

	const toast = useToast();

	if (!authStore.user) {
		return <Text>Obs! Error occur, please refresh the App!</Text>;
	}

	const userProfile = profileStore.profiles.find(
		(_profile) => _profile._id === authStore.user._id
	);

	const handleSubmit = () => {
		profileStore.updateProfile(userProfile._id, updateProfile, toast);
		setImageChanged(false);
	};

	return (
		<Box flex="1" w="100%" bg="#f5f5f5">
			<ScrollView>
				<ImageProfile
					userProfile={userProfile}
					updateProfile={updateProfile}
					imageChanged={imageChanged}
					setImageChanged={setImageChanged}
				/>

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
					w="25%"
					mr={3}
					mt={3}
					alignSelf={"flex-end"}
					style={{ backgroundColor: Colors.primary }}
					_text={{
						color: Colors.lightBg,
					}}
					onPress={handleSubmit}
				>
					Save
				</Button>
			</ScrollView>
		</Box>
	);
};

export default observer(Profile);
