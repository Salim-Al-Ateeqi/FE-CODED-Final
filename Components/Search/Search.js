import React from "react";
import { Box, Icon, Input } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// components
import { Colors } from "../../utils/Colors";

export default function Search({ setQuery }) {
	return (
		<Box
			style={{
				alignItems: "center",
				margin: 5,
			}}
		>
			<Input
				_focus={{
					borderColor: Colors.primary,
				}}
				returnKeyType="search"
				onChangeText={(value) => setQuery(value)}
				placeholder="Search for a group"
				bg="#fff"
				width="100%"
				borderRadius="50"
				py="2"
				px="1"
				fontSize="14"
				InputLeftElement={
					<Icon
						m="2"
						ml="3"
						size="6"
						color="gray.400"
						as={<MaterialIcons name="search" />}
					/>
				}
			/>
		</Box>
	);
}
