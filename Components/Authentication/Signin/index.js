import React, { useState } from "react";
import { observer } from "mobx-react";
import {
	Box,
	Button,
	FormControl,
	Heading,
	HStack,
	Input,
	Link,
	VStack,
	Text,
	useToast,
	Center,
	ScrollView,
} from "native-base";
import IntlPhoneInput from "react-native-intl-phone-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Platform } from "react-native";

// components
import { Colors } from "../../../assets/Theme/Colors";

// stores
import authStore from "../../../stores/authStore";

const Signin = ({ navigation }) => {
	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const handleNumber = ({
		dialCode,
		unmaskedPhoneNumber,
		phoneNumber,
		isVerified,
	}) => {
		const userNumber = phoneNumber.replace(" ", "");
		const newNumber = `${dialCode}${userNumber}`;
		setCredentials({ ...credentials, username: newNumber.replace("-", "") });
	};

	const toast = useToast();

	const handleSubmit = () => {
		authStore.login(credentials, toast, navigation);
	};
	return (
		<KeyboardAwareScrollView>
			<ScrollView>
				<Center>
					<Box safeArea p="2" py="8" w="100%" maxW="290">
						<Heading
							size="lg"
							fontWeight="600"
							color="coolGray.800"
							_dark={{
								color: "warmGray.50",
							}}
						>
							Welcome
						</Heading>
						<Heading
							mt="1"
							_dark={{
								color: "warmGray.200",
							}}
							color="coolGray.600"
							fontWeight="medium"
							size="xs"
						>
							Sign-in to continue!
						</Heading>

						<VStack space={3} mt="5">
							<FormControl>
								<FormControl.Label>Phone Number</FormControl.Label>
								<IntlPhoneInput
									containerStyle={{
										borderColor: "#d4d4d4",
										borderWidth: 0.5,
										height: 50,
										borderBottomColor: "#D1D3D4",
										borderRadius: 5,
									}}
									flagStyle={{ fontSize: 25 }}
									phoneInputStyle={{
										lineHeight: 18,
										// if english or arabic
										// textAlign: i18nStore.language === "en" ? "left" : "right",
									}}
									onChangeText={handleNumber}
									defaultCountry="KW"
									modalCountryItemCountryNameStyle={{
										fontSize: 15,
									}}
								/>
							</FormControl>

							<FormControl>
								<FormControl.Label>Password</FormControl.Label>
								<Input
									py={Platform.OS === "ios" ? "4" : "2"}
									onSubmitEditing={handleSubmit}
									returnKeyType="send"
									enablesReturnKeyAutomatically={true}
									KeyboardAwareScrollView={true}
									bg="#fff"
									placeholder="Enter your password"
									type="password"
									_focus={{ borderColor: Colors.secondary }}
									onChangeText={(password) =>
										setCredentials({ ...credentials, password })
									}
								/>
							</FormControl>

							<Button
								mt="2"
								style={{ backgroundColor: Colors.secondary }}
								onPress={handleSubmit}
							>
								Login
							</Button>
							<HStack mt="6" justifyContent="center">
								<Text
									fontSize="sm"
									color="coolGray.600"
									_dark={{
										color: "warmGray.200",
									}}
								>
									Not registered yet?{" "}
								</Text>
								<Link
									_text={{
										color: Colors.primary,
										fontWeight: "bold",
										fontSize: "sm",
									}}
									onPress={() => navigation.navigate("Signup")}
								>
									Register
								</Link>
							</HStack>
						</VStack>
					</Box>
				</Center>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
};

export default observer(Signin);
