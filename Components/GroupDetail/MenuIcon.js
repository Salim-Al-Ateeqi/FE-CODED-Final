import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Menu, Box, Center, Pressable, useToast } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import AlertOnDelete from "../AlertOnDelete";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";

const MenuIcon = ({ navigation, group }) => {
	const [openAlert, setOpenAlert] = useState(false);
	const toast = useToast();

	const showAlert = () => {
		setOpenAlert(true);
	};

	const handleDelete = () => {
		groupStore.deleteGroup(group._id, toast);
		setOpenAlert(false);
		navigation.navigate("Tabs");
	};

	const handleLeave = () => {
		console.log("Left Group");
		setOpenAlert(false);
		navigation.navigate("Tabs");
	};

	return (
		<Center>
			<Menu
				w="190"
				trigger={(triggerProps) => {
					return (
						<Pressable
							style={{ marginRight: 15 }}
							accessibilityLabel="More options menu"
							{...triggerProps}
						>
							<MaterialCommunityIcons
								name="dots-vertical"
								size={24}
								color="black"
							/>
						</Pressable>
					);
				}}
			>
				<Box w="100%" px={3} justifyContent="center">
					{/* Add Update Page for Group */}
					<Menu.Item
						onPress={() => navigation.navigate("EditGroup", { group })}
					>
						Group Info
					</Menu.Item>

					{authStore.user._id === group.owner ? (
						<Menu.Item onPress={showAlert}>Delete Group</Menu.Item>
					) : (
						<Menu.Item onPress={showAlert}>Exit Group</Menu.Item>
					)}
				</Box>
			</Menu>
			<AlertOnDelete
				group={group}
				openAlert={openAlert}
				setOpenAlert={setOpenAlert}
				handleDelete={handleDelete}
				handleLeave={handleLeave}
			/>
		</Center>
	);
};

export default observer(MenuIcon);
