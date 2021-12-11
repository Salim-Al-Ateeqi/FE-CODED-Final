import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/core";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
	Box,
	Pressable,
	Text,
	VStack,
	Divider,
	HStack,
	Icon,
	useToast,
} from "native-base";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import { Colors } from "../../assets/Theme/Colors";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import { baseURL } from "../../stores/baseURL";

const getIcon = (screenName) => {
	switch (screenName) {
		case "Groups":
			return "account-group";
		case "Edit Profile":
			return "account-edit";
		case "Logout":
			return "logout";
		default:
			return undefined;
	}
};

const CustomDrawerContent = (props) => {
	if (!authStore.user) {
		return <Text>You need to sign in.</Text>;
	}
	const navigation = useNavigation();
	const toast = useToast();

	const userProfile = profileStore.profiles.find(
		(_profile) => _profile._id === authStore.user._id
	);

	return (
		<DrawerContentScrollView {...props} safeArea>
			<VStack space="3" my="2" mx="1">
				<Box px="3">
					<HStack>
						<Image
							source={{
								uri: baseURL + userProfile.profile.image,
							}}
							style={{ width: 60, height: 60, borderRadius: 100 }}
						/>
						<VStack mx="3">
							<Text bold color="gray.700">
								{userProfile.profile.name}
							</Text>
							<Text fontSize="13" mt="1" color="gray.500" fontWeight="500">
								{userProfile.profile.status}
							</Text>
							<Text fontSize="12" mt="1" color="gray.500" fontWeight="500">
								{userProfile.phoneNumber}
							</Text>
						</VStack>
					</HStack>
				</Box>
				<Divider />
				<VStack divider={<Divider />} space="2">
					<VStack space="2">
						{props.state.routeNames.map((name, index) => (
							<Pressable
								px="5"
								py="3"
								rounded="md"
								key={name}
								bg={index === props.state.index ? "#dbf4ff" : "transparent"}
								onPress={() => props.navigation.navigate(name)}
							>
								<HStack space="7" alignItems="center">
									<Icon
										color={
											index === props.state.index ? Colors.primary : "gray.500"
										}
										size="5"
										as={<MaterialCommunityIcons name={getIcon(name)} />}
									/>
									<Text
										fontWeight="500"
										color={
											index === props.state.index ? Colors.primary : "gray.700"
										}
									>
										{name}
									</Text>
								</HStack>
							</Pressable>
						))}
					</VStack>
					<VStack space="5">
						<VStack space="3">
							<Pressable
								px="5"
								py="2"
								onPress={() => authStore.logout(navigation, toast)}
							>
								<HStack space="7" alignItems="center">
									<Icon
										color="gray.500"
										size="5"
										as={<MaterialCommunityIcons name="logout" />}
									/>
									<Text color="gray.700" fontWeight="500">
										Logout
									</Text>
								</HStack>
							</Pressable>
						</VStack>
					</VStack>
				</VStack>
			</VStack>
		</DrawerContentScrollView>
	);
};

export default observer(CustomDrawerContent);
