import React from "react";
import { observer } from "mobx-react";
import {
	Box,
	Text,
	HStack,
	Pressable,
	VStack,
	Spacer,
	Divider,
	Image,
} from "native-base";

// stores
import { baseURL } from "../../stores/baseURL";

const ViewMembers = ({ member }) => {
	return (
		<Pressable bg="white">
			<Box pl="4" pr="5" py="2">
				<HStack alignItems="center" space={3}>
					<Image
						borderRadius="50"
						alt="Members Image"
						size="48px"
						source={{ uri: baseURL + member.profile.image }}
					/>
					<VStack>
						<Text color="coolGray.800" _dark={{ color: "warmGray.50" }} bold>
							{member.profile.name}
						</Text>
					</VStack>
					<Spacer />

					{/* maybe we can navigate to user later on */}
					{/* <GroupMenuIcon group={group} navigation={navigation} /> */}
				</HStack>
			</Box>
			<Divider />
		</Pressable>
	);
};

export default observer(ViewMembers);
