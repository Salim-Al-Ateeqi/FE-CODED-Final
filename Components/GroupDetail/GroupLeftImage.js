import React from "react";
import { observer } from "mobx-react-lite";
import { Image } from "react-native";
import { Heading, HStack, Pressable } from "native-base";

// stores
import { baseURL } from "../../stores/baseURL";

const GroupLeftImage = ({ group, navigation }) => {
	return (
		<Pressable onPress={() => navigation.navigate("EditGroup", { group })}>
			<HStack space={4} alignItems="center" mb="2">
				<Image
					alt="Group Image."
					style={{
						width: 45,
						height: 45,
						borderRadius: 30,
						marginBottom: 5,
					}}
					defaultSource={require("../../assets/Media/defaultUserImage.jpg")}
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
