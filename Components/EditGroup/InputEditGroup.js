import React from "react";
import { observer } from "mobx-react-lite";
import { Icon, Input, FormControl, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// components
import { Colors } from "../../assets/Theme/Colors";

const InputEditGroup = ({
	group,
	updatedGroup,
	setUpdatedGroup,
	imageChanged,
	focusOnInput,
	handleUpdate,
}) => {
	return (
		<FormControl>
			<FormControl.Label ml="3">Group Name</FormControl.Label>
			<HStack justifyContent="space-evenly">
				<Input
					returnKeyType="send"
					// onSubmitEditing={handleUpdate}
					autoFocus={focusOnInput}
					w="100%"
					_focus={{ borderColor: Colors.primary }}
					variant={"underlined"}
					defaultValue={group.name}
					placeholder="Edit your name"
					InputLeftElement={
						<Icon
							as={<MaterialIcons name="group" />}
							size={5}
							ml="3"
							color="muted.400"
						/>
					}
					InputRightElement={
						<Icon
							as={<MaterialIcons name="edit" />}
							mr="3"
							size={5}
							color="muted.400"
							onPress={() => console.log("pressed")}
						/>
					}
					onChangeText={(name) =>
						imageChanged
							? setUpdatedGroup({ ...updatedGroup, name })
							: setUpdatedGroup({ ...group.name, name })
					}
				/>
			</HStack>
		</FormControl>
	);
};

export default observer(InputEditGroup);
