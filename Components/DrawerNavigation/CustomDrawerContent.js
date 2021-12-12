import React from "react";
import { observer } from "mobx-react";
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
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import { Colors } from "../../assets/Theme/Colors";
import DrawerProfile from "./DrawerProfile";

// stores
import authStore from "../../stores/authStore";

const getIcon = (screenName) => {
	switch (screenName) {
		case "Groups":
			return "chat";
		case "Account":
			return "account";
		case "About Us":
			return "information";
		case "Feedback":
			return "help-box";
		case "Logout":
			return "logout";
		default:
			return undefined;
	}
};

const CustomDrawerContent = (props) => {
	const toast = useToast();

	if (!authStore.user) {
		return <Text>You need to sign in.</Text>;
	}

	return (
		<DrawerContentScrollView {...props} safeArea>
			<VStack space="3" my="2" mx="1">
				<DrawerProfile />
				<Divider mb={5} />
				<VStack divider={<Divider />} space="2">
					<VStack space="2">
						{props.state.routeNames.map((name, index) => (
							<Pressable
								px="5"
								py="3"
								rounded="md"
								key={name}
								bg={index === props.state.index ? "#004282" : "transparent"}
								onPress={() => props.navigation.navigate(name)}
							>
								<HStack space="7" alignItems="center">
									<Icon
										color={
											index === props.state.index ? Colors.lightBg : "gray.500"
										}
										size="5"
										as={<MaterialCommunityIcons name={getIcon(name)} />}
									/>
									<Text
										fontWeight="500"
										color={
											index === props.state.index ? Colors.lightBg : "gray.700"
										}
									>
										{name}
									</Text>
								</HStack>
							</Pressable>
						))}
					</VStack>

					<VStack space="5" justifyContent={"center"}>
						<TouchableOpacity
							style={{ paddingLeft: 21, paddingTop: 10 }}
							onPress={() => authStore.logout(props.navigation, toast)}
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
						</TouchableOpacity>
					</VStack>
				</VStack>
			</VStack>
		</DrawerContentScrollView>
	);
};

export default observer(CustomDrawerContent);
