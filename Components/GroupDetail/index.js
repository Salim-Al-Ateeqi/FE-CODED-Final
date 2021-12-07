import { observer } from "mobx-react";
import { HStack, Spinner } from "native-base";
import React from "react";
import {
	VStack,
	Input,
	Button,
	IconButton,
	Icon,
	Text,
	NativeBaseProvider,
	Center,
	Box,
	Divider,
	Heading,
} from "native-base";
import groupStore from "../../stores/groupStore";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const GroupDetail = ({ route, navigation }) => {
	const { group } = route.params;

	if (groupStore.isLoading) {
		return <Spinner />;
	}

	return (
		<VStack flex={1} bg="white" w="100%">
			<Divider />
			<VStack mx="2" mt="5" w="100%" h="85%">
				<ScrollView>
					<Text>Data</Text>
				</ScrollView>
			</VStack>
			<Divider mb="2" />

			<KeyboardAwareScrollView extraScrollHeight={50}>
				<VStack width="100%" alignItems="center">
					<HStack>
						<Input
							placeholder="Type message"
							variant="filled"
							bg="muted.200"
							borderRadius="50"
							w="85%"
							py="1"
							px="3"
							mx="1"
							placeholderTextColor="muted.400"
							_hover={{ bg: "gray.200", borderWidth: 0 }}
							borderWidth="0"
							_web={{
								_focus: { style: { boxShadow: "none" } },
							}}
							InputLeftElement={
								<Icon
									size="sm"
									ml="3"
									color="#0077e6"
									as={<AntDesign name="pluscircle" />}
								/>
							}
						/>
						<MaterialCommunityIcons
							name="send-circle-outline"
							size={32}
							color="#0077e6"
						/>
					</HStack>
				</VStack>
			</KeyboardAwareScrollView>
		</VStack>
	);
};
export default observer(GroupDetail);
