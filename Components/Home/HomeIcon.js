import React from "react";
import { Box, Center, Pressable, Text } from "native-base";
import { Entypo } from "@expo/vector-icons";

const HomeIcon = ({ navigation, focused }) => {
	return (
		<Pressable py="3" onPress={() => navigation.navigate("Home")}>
			<Center>
				<Entypo
					style={{
						color: focused ? "#154c79" : "#748c94",
						marginBottom: 1,
					}}
					name="chat"
					size={27}
				/>
				<Text
					style={{
						color: focused ? "#154c79" : "#748c94",
					}}
				>
					Chat
				</Text>
			</Center>
		</Pressable>
	);
};

export default HomeIcon;
