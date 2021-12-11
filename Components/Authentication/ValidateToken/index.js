import React, { useState } from "react";
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
import authStore from "../../../stores/authStore";
import { observer } from "mobx-react";
import { Colors } from "../../../assets/Theme/Colors";

const ValidateTokens = ({ navigation }) => {
	const toast = useToast();

	const [userInput, setUserInput] = useState({ SMSToken: "" });
	const [matchingToken, setMatchingToken] = useState(false);

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
									_focus={{ borderColor: Colors.primary }}
									onChangeText={(SMSToken) =>
										setUserInput({ ...userInput, SMSToken })
									}
								/>
							</FormControl>

							<Button
								mt="2"
								style={{ backgroundColor: Colors.primary }}
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
