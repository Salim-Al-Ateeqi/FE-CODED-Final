import React from "react";
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
	Avatar,
	Spinner,
} from "native-base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { observer } from "mobx-react-lite";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import { baseURL } from "../../stores/baseURL";

const getIcon = (screenName) => {
	switch (screenName) {
		case "Home":
			return "home";
		case "Profile":
			return "account";
		case "Logout":
			return "logout";
		default:
			return undefined;
	}
};

const CustomDrawerContent = (props) => {
	if (!profileStore.isLoading) return <Spinner />;
	const navigation = useNavigation();
	const toast = useToast();

	const userProfile = profileStore.currentProfile;

	console.log(userProfile);
	return (
		<DrawerContentScrollView {...props} safeArea>
			<VStack space="6" my="2" mx="1">
				<Box px="3">
					<HStack alignItems="center">
						{/* <Avatar
							source={{
								uri: baseURL + userProfile.profile.image,
							}}
							size={50}
						/> */}
						<Text bold color="gray.700" mx="3">
							{userProfile.profile.name}
						</Text>
					</HStack>
					{/* <Text fontSize="14" mt="5" color="gray.500" fontWeight="500">
						{profileStore.profiles && profile.phoneNumber}
					</Text> */}
				</Box>

				<VStack divider={<Divider />} space="4">
					<VStack space="3">
						{props.state.routeNames.map((name, index) => (
							<Pressable
								px="5"
								py="3"
								rounded="md"
								bg={
									index === props.state.index
										? "rgba(6, 182, 212, 0.1)"
										: "transparent"
								}
								onPress={(event) => {
									props.navigation.navigate(name);
								}}
							>
								<HStack space="7" alignItems="center">
									<Icon
										color={
											index === props.state.index ? "primary.500" : "gray.500"
										}
										size="5"
										as={<MaterialCommunityIcons name={getIcon(name)} />}
									/>
									<Text
										fontWeight="500"
										color={
											index === props.state.index ? "primary.500" : "gray.700"
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
