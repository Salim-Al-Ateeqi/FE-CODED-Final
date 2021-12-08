import { observer } from "mobx-react";
import { HStack, KeyboardAvoidingView, Spinner } from "native-base";
import React from "react";
import { VStack, Input, Icon, Text, Box, Divider, Heading } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

// components
import { Colors } from "../../utils/Colors";

// stores
import groupStore from "../../stores/groupStore";

const GroupDetail = ({ route, navigation }) => {
	const { group } = route.params;

	if (groupStore.isLoading) {
		return <Spinner />;
	}

	return (
		<Box flex={1} bg="#fafafa">
			<Divider />

			<VStack mx="2" mt="5" flex={1}>
				<ScrollView>
					<Text>messages will be here</Text>
				</ScrollView>
			</VStack>

			<Divider mb="2" />

			<KeyboardAvoidingView>
				<VStack alignItems="center" mb="5">
					<HStack alignItems="center">
						<Input
							color="#27272a"
							placeholder="Type message"
							placeholderTextColor="#52525b"
							variant="filled"
							bg="#d4d4d8"
							borderRadius="50"
							w="85%"
							py="2"
							px="3"
							mx="1"
							_focus={{ borderColor: Colors.Primary }}
							borderWidth="0"
							InputLeftElement={
								<Icon
									size="sm"
									ml="3"
									color="#3f3f46"
									as={<AntDesign name="pluscircle" />}
								/>
							}
						/>
						<MaterialCommunityIcons
							name="send-circle-outline"
							size={32}
							color={Colors.Primary}
						/>
					</HStack>
				</VStack>
			</KeyboardAvoidingView>
		</Box>
	);
};
export default observer(GroupDetail);
