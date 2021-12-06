import React, { useState } from "react";

import { Box, Icon, Input } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

// Components
// import SearchTripsList from "../SearchTrips/SearchTripsList";

export default function Search({ navigation }) {
	const [query, setQuery] = useState("");
	return (
		<Box
			style={{
				backgroundColor: "#0f1010",
				height: "100%",
				width: "100%",
				paddingTop: 10,
				alignItems: "center",
			}}
		>
			<Input
				onChangeText={(value) => setQuery(value)}
				placeholder="Search for groups"
				bg="#fff"
				width="80%"
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

			{/* <SearchTripsList query={query} navigation={navigation} /> */}
		</Box>
	);
}
