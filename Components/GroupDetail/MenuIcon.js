import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Menu, Box, Center, Pressable, useToast, Divider } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// components
import AlertOnDelete from "../AlertOnDelete";
import { Colors } from "../../assets/Theme/Colors";

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
		setOpenAlert(false);
		navigation.navigate("Tabs");
		groupStore.leaveGroup(
			group._id,
			authStore.user._id,
			navigation,
			toast,
			"home"
		);
	};

	return (
		<Center>
			<Menu
				borderColor={Colors.primary}
				borderWidth={0.5}
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
								color={Colors.lightBg}
							/>
						</Pressable>
					);
				}}
			>
				<Box w="100%" px={3} justifyContent="center">
					{/* Add Update Page for Group */}
					<Menu.Item
						text={{ color: Colors.primary }}
						onPress={() => navigation.navigate("EditGroup", { group })}
					>
						Group Info
					</Menu.Item>
					<Divider />

					{authStore.user._id === group.owner ? (
						<Menu.Item _text={{ color: Colors.primary }} onPress={showAlert}>
							Delete Group
						</Menu.Item>
					) : (
						<Menu.Item text={{ color: Colors.primary }} onPress={showAlert}>
							Exit Group
						</Menu.Item>
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
