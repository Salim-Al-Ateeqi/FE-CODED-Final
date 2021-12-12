import React from "react";
import { Box, IconButton, Stagger, Icon } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

const StaggerButton = ({ navigation, group, onToggle, isOpen, onClose }) => {
	return (
		<Box ml={5} alignItems="flex-start">
			<Stagger
				visible={isOpen}
				initial={{
					opacity: 0,
					scale: 0,
					translateY: 34,
				}}
				animate={{
					translateY: 0,
					scale: 1,
					opacity: 1,
					transition: {
						type: "spring",
						mass: 0.8,
						stagger: {
							offset: 30,
							reverse: true,
						},
					},
				}}
				exit={{
					translateY: 34,
					scale: 0.5,
					opacity: 0,
					transition: {
						duration: 100,
						stagger: {
							offset: 30,
							reverse: true,
						},
					},
				}}
			>
				<IconButton
					onPress={() => {
						navigation.navigate("MoviePoll", { group });
						onClose();
					}}
					mb="4"
					variant="solid"
					bg="red.500"
					colorScheme="red"
					borderRadius="full"
					icon={
						<Icon
							as={MaterialIcons}
							size="6"
							name="photo-library"
							_dark={{
								color: "warmGray.50",
							}}
							color="warmGray.50"
						/>
					}
				/>
			</Stagger>
		</Box>
	);
};

export default StaggerButton;
