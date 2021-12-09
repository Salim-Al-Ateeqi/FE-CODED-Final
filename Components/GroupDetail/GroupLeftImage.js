import React from "react";
import { observer } from "mobx-react-lite";
import { Image } from "react-native";
import { Box } from "native-base";

// stores
import { baseURL } from "../../stores/baseURL";

const GroupLeftImage = ({ group }) => {
	return (
		<Box>
			<Image
				style={{
					width: 50,
					height: 50,
					borderRadius: 30,
					marginLeft: 10,
					marginBottom: 5,
				}}
				source={{
					uri: baseURL + group.image,
				}}
			/>
		</Box>
	);
};

export default observer(GroupLeftImage);
