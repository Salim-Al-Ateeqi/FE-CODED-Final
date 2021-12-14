import React from "react";
import { observer } from "mobx-react";
import { Heading, HStack, Pressable } from "native-base";

// components
import ImageHeader from "./ImageHeader";
import NameHeader from "./NameHeader";
import { Platform } from "react-native";

const HeaderDetail = ({ group, navigation }) => {
	const leftMargin = Platform.OS === "ios" ? 20 : 0;
	const bottomMargin = Platform.OS === "ios" ? 1 : 0;

	return (
		<Pressable onPress={() => navigation.navigate("EditGroup", { group })}>
			<HStack
				w={250}
				space={4}
				alignItems="center"
				mr={leftMargin}
				mb={bottomMargin}
			>
				<ImageHeader group={group} />

				<NameHeader group={group} />
			</HStack>
		</Pressable>
	);
};

export default observer(HeaderDetail);
