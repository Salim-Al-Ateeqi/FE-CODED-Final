import React, { useState } from "react";
import { Menu, Box, Center, Pressable } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import groupStore from "../../stores/groupStore";

const MenuIcon = ({ navigation, group }) => {
	const handleDelete = () => {
		groupStore.deleteGroup(group._id);
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
					<Menu.Item
						onPress={() => navigation.navigate("MoviePoll", { group: group })}
					>
						Add Movie Poll
					</Menu.Item>
					<Menu.Item
						onPress={() => navigation.navigate("AddMembers", { group: group })}
					>
						Add Members
					</Menu.Item>

					{/* Add Update Page for Group */}
					<Menu.Item
						onPress={() => navigation.navigate("EditGroup", { group: group })}
					>
						Group Info
					</Menu.Item>
					{/* Add Delete Handler and navigate */}
					<Menu.Item onPress={handleDelete}>Delete Group</Menu.Item>
				</Box>
			</Menu>
		</Center>
	);
};

export default MenuIcon;
