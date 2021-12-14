import React from "react";
import { observer } from "mobx-react";
import { Heading, HStack, Pressable } from "native-base";
import { Image } from "react-native";
import { Platform } from "react-native";

// stores
import { baseURL } from "../../../stores/baseURL";

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
				{group.image ? (
					<Image
						alt="Group Image."
						style={{
							width: 45,
							height: 45,
							borderRadius: 30,
							marginBottom: 5,
						}}
						defaultSource={require("../../../assets/Media/defaultUserImage.jpg")}
						source={{
							uri: baseURL + group.image,
						}}
					/>
				) : (
					<Image
						alt="Group Image."
						style={{
							width: 45,
							height: 45,
							borderRadius: 30,
							marginBottom: 5,
						}}
						defaultSource={require("../../../assets/Media/defaultUserImage.jpg")}
					/>
				)}

				<Heading fontSize={18}>{group.name}</Heading>
			</HStack>
		</Pressable>
	);
};

export default observer(HeaderDetail);
