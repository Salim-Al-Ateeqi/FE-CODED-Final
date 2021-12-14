import React, { useState } from "react";
import { observer } from "mobx-react";
import { TouchableOpacity } from "react-native";
import {
	Box,
	Text,
	HStack,
	VStack,
	Icon,
	useDisclose,
	useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// components
import { Colors } from "../../assets/Theme/Colors";
import AlertOnDelete from "../AlertOnDelete";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";

const DeleteGroupButton = ({ group, navigation }) => {
	const [openAlert, setOpenAlert] = useState(false);
	const { onClose } = useDisclose();
	const toast = useToast();
	const showAlert = () => setOpenAlert(true);

	const handleDelete = () => {
		groupStore.deleteGroup(group._id, toast);
		setOpenAlert(false);
		onClose();
		navigation.navigate("Tabs");
	};

	const handleLeave = () => {
		console.log("Left Group");
		setOpenAlert(false);
		onClose();
		navigation.navigate("Tabs");
	};

	return (
		<Box flex={1} justifyContent={"center"} pl="6" pr="5" py="2" h={55}>
			{authStore.user._id === group.owner ? (
				<TouchableOpacity onPress={showAlert}>
					<HStack alignItems="center" space={4}>
						<Icon color={Colors.danger} as={<MaterialIcons name="delete" />} />
						<VStack>
							<Text color={Colors.danger} _dark={{ color: "warmGray.50" }} bold>
								Delete Group
							</Text>
						</VStack>
					</HStack>
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={showAlert}>
					<HStack alignItems="center" space={4}>
						<Icon color={Colors.danger} as={<MaterialIcons name="logout" />} />
						<VStack>
							<Text color={Colors.danger} _dark={{ color: "warmGray.50" }} bold>
								Exit Group
							</Text>
						</VStack>
					</HStack>
				</TouchableOpacity>
			)}
			<AlertOnDelete
				group={group}
				handleDelete={handleDelete}
				handleLeave={handleLeave}
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
				onClose={onClose}
				navigation={navigation}
			/>
		</Box>
	);
};

export default observer(DeleteGroupButton);
