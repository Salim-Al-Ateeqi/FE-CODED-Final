import React from "react";
import { Actionsheet, useDisclose, Icon, Box, Text } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Path } from "react-native-svg";

// stores
import groupStore from "../../stores/groupStore";

const GroupMenuIcon = ({ group, navigation }) => {
	const { isOpen, onOpen, onClose } = useDisclose();
	const handleDelete = () => {
		groupStore.deleteGroup(group._id);
	};

	return (
		<>
			<MaterialCommunityIcons
				onPress={onOpen}
				name="dots-vertical"
				size={24}
				color="black"
			/>

			<Actionsheet isOpen={isOpen} onClose={onClose} size="full">
				<Actionsheet.Content>
					<Box w="100%" h={60} px={4} justifyContent="center">
						<Text
							fontSize="16"
							color="gray.500"
							_dark={{
								color: "gray.300",
							}}
						>
							{group.name}
						</Text>
					</Box>

					<Actionsheet.Item
						onPress={() => navigation.navigate("EditGroup", { group: group })}
						startIcon={
							<Icon
								as={MaterialIcons}
								color="trueGray.400"
								mr="1"
								size="6"
								name="info"
							/>
						}
					>
						Group Info
					</Actionsheet.Item>

					<Actionsheet.Item
						onPress={handleDelete}
						startIcon={
							<Icon
								as={MaterialIcons}
								color="trueGray.400"
								mr="1"
								size="6"
								name="delete"
							/>
						}
					>
						Leave Group
					</Actionsheet.Item>

					<Actionsheet.Item
						p={3}
						onPress={onClose}
						startIcon={
							<Icon
								color="trueGray.400"
								mr="1"
								h="24"
								w="24"
								viewBox="0 0 24 24"
								fill="none"
							>
								<Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
							</Icon>
						}
					>
						Cancel
					</Actionsheet.Item>
				</Actionsheet.Content>
			</Actionsheet>
		</>
	);
	// <Center>
	// 	<Menu
	// 		w="190"
	// 		trigger={(triggerProps) => {
	// 			return (
	// 				<Pressable
	// 					style={{ marginRight: -5 }}
	// 					accessibilityLabel="More options menu"
	// 					{...triggerProps}
	// 				>
	// 					<MaterialCommunityIcons
	// 						name="dots-vertical"
	// 						size={24}
	// 						color="black"
	// 					/>
	// 				</Pressable>
	// 			);
	// 		}}
	// 	>
	// 		<Box w="100%" px={4} justifyContent="center">
	// 			{/* <Menu.Item
	// 				onPress={() => navigation.navigate("MoviePoll", { group: group })}
	// 			>
	// 				Add Movie Poll
	// 			</Menu.Item> */}
	// 			{/* <Menu.Item onPress={() => navigation.navigate("AddMembers")}>
	// 				Add Members
	// 			</Menu.Item> */}
	// 			{/* Add page to return group member list */}
	// 			{/* Add Update Page for Group */}
	// 			<Menu.Item
	// 				onPress={() => navigation.navigate("EditGroup", { group: group })}
	// 			>
	// 				Group Info
	// 			</Menu.Item>
	// 			{/* Add Delete Handler and navigate */}
	// 			<Menu.Item onPress={handleDelete}>Leave Group</Menu.Item>
	// 		</Box>
	// 	</Menu>
	// </Center>
};

export default GroupMenuIcon;
