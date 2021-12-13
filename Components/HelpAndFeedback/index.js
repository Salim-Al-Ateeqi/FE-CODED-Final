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
} from "native-base";

// components
import { Colors } from "../../assets/Theme/Colors";

const HelpAndFeedBack = () => {
	const [feedbackData, setFeedbackData] = useState({
		email: "",
		feedback: "",
	});
	const toast = useToast();

	const handleSubmit = () => {
		setFeedbackData("");
		if (!toast.isActive(id)) {
			toast.show({
				id,
				title: "Thank you for your feedback.",
				status: "success",
				placement: "top",
				duration: 2500,
			});
		}
	};

	return (
		<Center flex={1} px="3">
			<Box p="2" w="90%" maxW="400" py="8">
				<Heading
					size="lg"
					color="coolGray.800"
					_dark={{
						color: "warmGray.50",
					}}
					fontWeight="semibold"
				>
					Send Feedback
				</Heading>
				<Heading
					mt="1"
					color="coolGray.600"
					_dark={{
						color: "warmGray.200",
					}}
					fontWeight="medium"
					size="xs"
				>
					Tell us what you love about the app, or what we could be doing better.
				</Heading>
				<VStack space={5} mt="5">
					<FormControl>
						<FormControl.Label>Email</FormControl.Label>
						<Input
							Value={feedbackData.email}
							placeholder="Enter email"
							type="email"
							bg={"#fff"}
							keyboardType="email-address"
							_focus={{ borderColor: Colors.primary }}
							onChangeText={(email) =>
								setFeedbackData({ ...feedbackData, email })
							}
						/>
					</FormControl>

					<FormControl>
						<FormControl.Label>Describe Your Feedback</FormControl.Label>
						<Input
							value={feedbackData.feedback}
							bg={"#fff"}
							h={100}
							placeholder="Enter feedback"
							_focus={{ borderColor: Colors.primary }}
							onChangeText={(feedback) =>
								setFeedbackData({ ...feedbackData, feedback })
							}
						/>
					</FormControl>

					<Button
						mt="2"
						style={{ backgroundColor: Colors.primary }}
						onPress={handleSubmit}
					>
						Send
					</Button>
				</VStack>
			</Box>
		</Center>
	);
};

export default HelpAndFeedBack;
