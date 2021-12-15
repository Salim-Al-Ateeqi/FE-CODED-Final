import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, HStack, VStack, Spacer, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

// components
import { Colors } from "../../assets/Theme/Colors";

const AddMembersButton = ({ navigation, group }) => {
	return (
		<Box flex={1} justifyContent={"center"} pl="5" pr="5" py="2" h={55}>
			<TouchableOpacity
				onPress={() => navigation.navigate("AddMembers", { group })}
			>
				<HStack alignItems="center" space={4}>
					<Icon color={Colors.primary} as={<Ionicons name="add" />} />
					<VStack>
						<Text color={Colors.primary} _dark={{ color: "warmGray.50" }} bold>
							Add Contacts
						</Text>
					</VStack>
					<Spacer />
				</HStack>
			</TouchableOpacity>
		</Box>
	);
};

export default AddMembersButton;
