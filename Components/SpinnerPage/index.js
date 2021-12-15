import React from "react";
import { Heading, HStack, Center, Spinner } from "native-base";

// components
import { Colors } from "../../assets/Theme/Colors";

const SpinnerPage = () => {
	return (
		<Center flex={1} alignItems={"center"}>
			<HStack space={2} alignItems="center">
				<Spinner accessibilityLabel="Loading posts" color={Colors.secondary} />
				<Heading color={Colors.secondary} fontSize="lg">
					Loading
				</Heading>
			</HStack>
		</Center>
	);
};

export default SpinnerPage;
