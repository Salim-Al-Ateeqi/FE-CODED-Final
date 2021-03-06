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
	Button,
	Box,
	useToast,
} from "native-base";
import { KeyboardAvoidingView, Platform } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

// components
import { Colors } from "../../assets/Theme/Colors";
import ImageProfile from "./ImageProfile";

// stores
import profileStore from "../../stores/ProfileStore";
import authStore from "../../stores/authStore";

const Profile = () => {
	const [imageChanged, setImageChanged] = useState(false);
	const [updatedProfile, setUpdatedProfile] = useState({
		name: "",
		image: "",
		status: "",
	});

	const toast = useToast();

	if (!authStore.user) {
		return <Text>Obs! Error occur, please refresh the App!</Text>;
	}

	const userProfile = profileStore.profiles.find(
		(_profile) => _profile._id === authStore.user._id
	);

	const handleSubmit = () => {
		profileStore.updateProfile(userProfile._id, updatedProfile, toast);
	};

	return (
		<Box flex="1" w="100%" bg="#f5f5f5">
			<ScrollView>
				<ImageProfile
					userProfile={userProfile}
					updatedProfile={updatedProfile}
					setUpdatedProfile={setUpdatedProfile}
					imageChanged={imageChanged}
					setImageChanged={setImageChanged}
				/>

				<KeyboardAvoidingView keyboardVerticalOffset={5}>
					<VStack>
						<Center>
							<FormControl w="100%" mb="2">
								<FormControl.Label ml="3">Name</FormControl.Label>
								<Input
									py={Platform.OS === "ios" ? "4" : "2"}
									variant={"underlined"}
									_focus={{ borderColor: Colors.secondary }}
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
										imageChanged
											? setUpdatedProfile({ ...updatedProfile, name })
											: setUpdatedProfile({ ...userProfile.profile, name })
									}
								/>
							</FormControl>

							<FormControl w="100%" my="2">
								<FormControl.Label ml="3">Status</FormControl.Label>
								<Input
									py={Platform.OS === "ios" ? "4" : "2"}
									variant={"underlined"}
									_focus={{ borderColor: Colors.secondary }}
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
										imageChanged
											? setUpdatedProfile({ ...updatedProfile, status })
											: setUpdatedProfile({ ...userProfile.profile, status })
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
					style={{ backgroundColor: Colors.secondary }}
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
