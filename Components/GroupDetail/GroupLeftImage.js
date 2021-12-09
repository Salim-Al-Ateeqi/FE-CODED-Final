import React from "react";
import { observer } from "mobx-react-lite";
import { Image } from "react-native";
import { Box, Heading, HStack, Pressable } from "native-base";

// stores
import { baseURL } from "../../stores/baseURL";

const GroupLeftImage = ({ group, navigation }) => {
	return (
		<Pressable onPress={() => navigation.navigate("EditGroup", { group })}>
			<HStack space={4} alignItems="center">
				<Image
					style={{
						width: 50,
						height: 50,
						borderRadius: 30,
						marginBottom: 5,
					}}
					source={{
						uri: baseURL + group.image,
					}}
				/>
				<Heading size={"md"}>{group.name}</Heading>
			</HStack>
		</Pressable>
	);
};

export default observer(GroupLeftImage);
