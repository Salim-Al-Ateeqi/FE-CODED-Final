import React from "react";

import { Box, Center, Pressable, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";

const SearchIcon = ({ navigation, focused }) => {
	return (
		<Pressable py="3" onPress={() => navigation.navigate("Search")}>
			<Center>
				<AntDesign
					name="search1"
					size={27}
					style={{
						color: focused ? "#154c79" : "#748c94",
						marginBottom: 1,
					}}
				/>
				<Text
					style={{
						color: focused ? "#154c79" : "#748c94",
					}}
				>
					Search
				</Text>
			</Center>
		</Pressable>
	);
};

export default SearchIcon;
