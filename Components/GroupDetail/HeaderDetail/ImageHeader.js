import React from "react";
import { Image } from "react-native";
import { HStack } from "native-base";
import { observer } from "mobx-react";

// stores
import { baseURL } from "../../../stores/baseURL";

const ImageHeader = ({ group }) => {
	return (
		<Image
			alt="Group Image."
			style={{
				width: 45,
				height: 45,
				borderRadius: 30,
				marginBottom: 5,
			}}
			defaultSource={require("../../../assets/Media/defaultUserImage.jpg")}
			source={{
				uri: baseURL + group.image,
			}}
		/>
	);
};

export default observer(ImageHeader);
