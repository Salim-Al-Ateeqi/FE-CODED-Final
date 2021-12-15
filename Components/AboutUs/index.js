import React from "react";
import {
	Box,
	Heading,
	AspectRatio,
	Image,
	Text,
	Center,
	HStack,
	Stack,
	Divider,
	Button,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

// components
import { Colors } from "../../assets/Theme/Colors";

const AboutUs = () => {
	const navigation = useNavigation();

	return (
		<Center flex={1}>
			<Box
				flex={1}
				maxW="full"
				overflow="hidden"
				borderColor="coolGray.200"
				borderWidth="0"
				_dark={{
					borderColor: "coolGray.600",
					backgroundColor: Colors.lightBg,
				}}
				_light={{
					backgroundColor: Colors.lightBg,
				}}
			>
				<Center mt={5}>
					<Image
						source={require("../../assets/Media/PollLogo.png")}
						alt="image"
						size={"56"}
					/>

					<Divider mt={5} />
				</Center>

				<Stack p="4" space={3}>
					<Stack space={2}>
						<Heading size="md" ml="-1">
							Poll App
						</Heading>
						<Text
							fontWeight="semibold"
							fontSize="xs"
							_light={{
								color: Colors.secondary,
							}}
							_dark={{
								color: Colors.tertiary,
							}}
							fontWeight="500"
							ml="-0.5"
							mt="-1"
						>
							Poll and watch a movie.
						</Text>
					</Stack>
					<Text fontWeight="400">
						Our application is about movie polls. So if you are confuse about
						what to watch tonight? Make a group and votes with your family or
						friends.
					</Text>
					<Button
						w={"45%"}
						mt={5}
						alignSelf={"center"}
						onPress={() => navigation.navigate("Feedback")}
						style={{ backgroundColor: Colors.secondary }}
					>
						Send Feedback
					</Button>
				</Stack>
			</Box>
		</Center>
	);
};

export default AboutUs;
