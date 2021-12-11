import React, { useState } from "react";
import { observer } from "mobx-react";
import IntlPhoneInput from "react-native-intl-phone-input";
import {
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Input,
	Link,
	Button,
	HStack,
	Center,
	useToast,
	ScrollView,
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// components
import { Colors } from "../../../assets/Theme/Colors";

// stores
import authStore from "../../../stores/authStore";
import profileStore from "../../../stores/ProfileStore";

const Signup = ({ navigation }) => {
	const toast = useToast();
	const [number, setNumber] = useState("");

	const [user, setUser] = useState({
		phoneNumber: "",
		password: "",
		profile: { name: "" },
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [equalPassword, setEqualPassword] = useState(false);

	// To handle the IntlPhoneInput library we need to pass this function
	const handleNumber = ({
		dialCode,
		unmaskedPhoneNumber,
		phoneNumber,
		isVerified,
	}) => {
		const userNumber = phoneNumber.replace(" ", "");
		const newNumber = `${dialCode}${userNumber}`;
		setUser({ ...user, phoneNumber: newNumber.replace("-", "") });
	};

	// To show the incorrect password for Confirm password field
	const handleCheckPassword = () => {
		confirmPassword === user.password
			? setEqualPassword(false)
			: setEqualPassword(true);
	};

	const handleSubmit = () => {
		handleCheckPassword();
		authStore.register(user, toast, navigation);
	};

	return (
		<KeyboardAwareScrollView>
			<ScrollView>
				<Center mt="20">
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
							Register to continue!
						</Heading>

						{equalPassword && (
							<Heading mt="3" color="#dc2626" fontWeight="medium" size="xs">
								Your password's are not the same.
							</Heading>
						)}

						<VStack space={3} mt="5">
							<FormControl>
								<FormControl.Label>Phone Number</FormControl.Label>
								<IntlPhoneInput
									containerStyle={{
										borderColor: "#d4d4d4",
										borderWidth: 1,
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
								<FormControl.Label>Name</FormControl.Label>
								<Input
									bg="#fff"
									h="50"
									type="text"
									placeholder="Enter your Name"
									_focus={{ borderColor: Colors.primary }}
									onChangeText={(name) =>
										setUser({ ...user, profile: { name: name } })
									}
								/>
							</FormControl>

							<FormControl>
								<FormControl.Label>Password</FormControl.Label>
								<Input
									bg="#fff"
									h="50"
									type="password"
									placeholder="Enter your password"
									_focus={{ borderColor: Colors.primary }}
									onChangeText={(password) => setUser({ ...user, password })}
								/>
							</FormControl>

							<FormControl>
								<FormControl.Label>Confirm Password</FormControl.Label>
								<Input
									bg="#fff"
									h="50"
									type="password"
									placeholder="Confirm your password"
									_focus={{ borderColor: Colors.primary }}
									onChangeText={(value) => setConfirmPassword(value)}
								/>
							</FormControl>

							<Button
								mt="2"
								style={{ backgroundColor: Colors.primary }}
								onPress={handleSubmit}
							>
								Register
							</Button>
							<HStack mt="6" justifyContent="center">
								<Text
									fontSize="sm"
									color="coolGray.600"
									_dark={{
										color: "warmGray.200",
									}}
								>
									I already have an account.{" "}
								</Text>
								<Link
									_text={{
										color: "#52525b",
										fontWeight: "bold",
										fontSize: "sm",
									}}
									onPress={() => navigation.navigate("Signin")}
								>
									Login
								</Link>
							</HStack>
						</VStack>
					</Box>
				</Center>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
};

export default observer(Signup);
