import React, { useState } from "react";
import {
  Menu,
  Box,
  Center,
  Pressable,
  Modal,
  FormControl,
  Input,
  Button,
} from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import groupStore from "../../stores/groupStore";


const MenuIcon = ({ navigation, group, route }) => {
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
				<Box w="100%" px={4} justifyContent="center">
					<Menu.Item
						onPress={() => navigation.navigate("MoviePoll", { group: group })}
					>
						Add Movie Poll
					</Menu.Item>
					<Menu.Item onPress={() => navigation.navigate("AddMembers")}>
						Add Members
					</Menu.Item>
					{/* Add page to return group member list */}
					<Menu.Item>View Members</Menu.Item>
					{/* Add Update Page for Group */}
					<Menu.Item onPress={() => navigation.navigate("EditGroup")}>Edit Group</Menu.Item>
					{/* Add Delete Handler and navigate */}
					<Menu.Item onPress={handleDelete}>Delete Group</Menu.Item>
				</Box>
			</Menu>
		</Center>
	);
};

export default MenuIcon;
