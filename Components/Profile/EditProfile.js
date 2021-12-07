import React from "react";

import { Popover, Button, Input, FormControl, Box, Center } from "native-base";
import { Feather } from "@expo/vector-icons";

const EditProfile = () => {
	const initialFocusRef = React.useRef(null);
	return (
		<Box h="60%" w="100%" alignItems="center">
			<Popover
				initialFocusRef={initialFocusRef}
				trigger={(triggerProps) => {
					return (
						<Feather
							{...triggerProps}
							style={{
								justifyContent: "flex-end",
								marginLeft: "auto",
								color: "#71717a",
							}}
							name="edit"
							size={20}
							color="black"
						/>
					);
				}}
			>
				<Popover.Content width="56">
					<Popover.Arrow />
					<Popover.CloseButton />
					{/* @ts-ignore */}
					<Popover.Header>Personal Details</Popover.Header>
					<Popover.Body>
						<FormControl>
							<FormControl.Label
								_text={{
									fontSize: "xs",
									fontWeight: "medium",
								}}
							>
								First Name
							</FormControl.Label>
							<Input
								rounded="sm"
								fontSize="xs"
								backgroundColor="white"
								ref={initialFocusRef}
							/>
						</FormControl>
						<FormControl mt="3">
							<FormControl.Label
								_text={{
									fontSize: "xs",
									fontWeight: "medium",
								}}
							>
								Last Name
							</FormControl.Label>
							<Input rounded="sm" fontSize="xs" backgroundColor="white" />
						</FormControl>
					</Popover.Body>
					<Popover.Footer>
						<Button.Group>
							<Button colorScheme="coolGray" variant="ghost">
								Cancel
							</Button>
							<Button>Save</Button>
						</Button.Group>
					</Popover.Footer>
				</Popover.Content>
			</Popover>
		</Box>
	);
};

export default EditProfile;
