import React, { useState } from "react";
import { observer } from "mobx-react";
import {
	Box,
	Heading,
	VStack,
	FormControl,
	Input,
	Button,
	Center,
	useToast,
	Spinner,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

// components
import { Colors } from "../../../assets/Theme/Colors";

// stores
import authStore from "../../../stores/authStore";
import profileStore from "../../../stores/ProfileStore";

const ValidateTokens = ({ navigation }) => {
	const [userInput, setUserInput] = useState({ SMSToken: "" });
	const [matchingToken, setMatchingToken] = useState(false);
	const toast = useToast();

	if (!authStore.user) {
		return <Spinner />;
	}

	const userSMSAuthToken = authStore.user.SMSToken;

	const checkMatchingToken = () => {
		userSMSAuthToken !== userInput
			? setMatchingToken(false)
			: setMatchingToken(true);
	};

	const handleSubmit = () => {
		checkMatchingToken();
		authStore.validateToken(userInput, toast, navigation);
		profileStore.getUserProfile();
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
							SMS Verification
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
							{authStore.message}
						</Heading>

						{matchingToken && (
							<Heading mt="3" color="#dc2626" fontWeight="medium" size="xs">
								Please ensure you've entered the token correctly!
							</Heading>
						)}
						<VStack space={3} mt="5">
							<FormControl>
								<FormControl.Label>Please Enter Your Token</FormControl.Label>
								<Input
									bg="#fff"
									h="50"
									keyboardType={"number-pad"}
									placeholder="Enter Your Token"
									_focus={{ borderColor: Colors.secondary }}
									onChangeText={(SMSToken) =>
										setUserInput({ ...userInput, SMSToken })
									}
								/>
							</FormControl>

							<Button
								mt="2"
								style={{ backgroundColor: Colors.secondary }}
								onPress={handleSubmit}
							>
								Register
							</Button>
						</VStack>
					</Box>
				</Center>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
};

export default observer(ValidateTokens);
