import React, { useState } from "react";
import {
	Box,
	Button,
	FormControl,
	Heading,
	Input,
	VStack,
	Center,
} from "native-base";
import { observer } from "mobx-react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

// components
import MovieList from "./MovieList";
import { Colors } from "../../utils/Colors";

// stores
import imdbStore from "../../stores/imdbStore";

const index = ({ navigation, route }) => {
	const { group } = route.params;

	const [query, setQuery] = useState("");

	const handleSubmit = () => {
		imdbStore.fetchMovies(query);
		setQuery("");
	};

	return (
		<KeyboardAwareScrollView>
			<ScrollView>
				<Center>
					<Box safeArea p="1" w="100%" maxW="290">
						<Heading
							size="lg"
							fontWeight="600"
							color="coolGray.800"
							_dark={{
								color: "warmGray.50",
							}}
						>
							Find A Movie
						</Heading>
						<VStack space={3} mt="5">
							<FormControl>
								<FormControl.Label>Search By Title</FormControl.Label>
								<Input
									placeholder="Enter title"
									value={query}
									_focus={{
										borderColor: Colors.Primary,
									}}
									onChangeText={(query) => setQuery(query)}
								/>
							</FormControl>
						</VStack>
						<Button
							mt="2"
							style={{ backgroundColor: Colors.Primary }}
							onPress={handleSubmit}
						>
							Find
						</Button>
						<VStack w="100%" mt="1">
							{imdbStore.data && (
								<MovieList navigation={navigation} group={group} />
							)}
						</VStack>
					</Box>
				</Center>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
};

export default observer(index);
