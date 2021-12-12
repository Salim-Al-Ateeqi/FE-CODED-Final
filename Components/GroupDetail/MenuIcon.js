import React from "react";
import { observer } from "mobx-react-lite";
import { Menu, Box, Center, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";

const MenuIcon = ({ navigation, group }) => {
	const handleDelete = () => {
		groupStore.deleteGroup(group._id);
		navigation.navigate("Tabs");
	};

	const handleLeave = () => {
		console.log("Left Group");
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
						onPress={() => navigation.navigate("EditGroup", { group: group })}
					>
						Group Info
					</Menu.Item>

					{authStore.user._id === group.owner ? (
						<Menu.Item onPress={handleDelete}>Delete Group</Menu.Item>
					) : (
						<Menu.Item onPress={handleLeave}>Exit Group</Menu.Item>
					)}
				</Box>
			</Menu>
		</Center>
	);
};

export default observer(MenuIcon);
