import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Center, Icon, VStack, Pressable, Box, Badge } from "native-base";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

// components
import { Colors } from "../../assets/Theme/Colors";

// stores
import { baseURL } from "../../stores/baseURL";

const ImageEditGroup = ({
	group,
	updatedGroup,
	imageChanged,
	setImageChanged,
	setUpdatedGroup,
}) => {
	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			}
		})();
	}, []);

	const _pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.cancelled) {
				const localUri = result.uri;
				const filename = localUri.split("/").pop();
				const match = /.(\w+)$/.exec(filename);
				const image = {
					uri: localUri,
					name: filename,
					type: match ? `image/${match[1]}` : image,
				};
				if (updatedGroup.name === "") {
					setUpdatedGroup({ ...updatedGroup, name: group.name, image: image });
					setImageChanged(true);
				} else {
					setUpdatedGroup({ ...updatedGroup, image: image });
					setImageChanged(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<VStack mt="10" mb="7" mx="1">
			<Center space="3">
				<Pressable onPress={_pickImage}>
					{!imageChanged ? (
						<Box position={"relative"}>
							<Badge
								position={"absolute"}
								top={83}
								p={1}
								rounded={50}
								alignSelf="flex-end"
								zIndex={1}
								style={{ backgroundColor: Colors.tertiary }}
							>
								<Icon
									as={<MaterialIcons name="edit" />}
									size={6}
									color={Colors.lightBg}
								/>
							</Badge>
							<Image
								defaultSource={require("../../assets/Media/defaultUserImage.jpg")}
								style={{ width: 120, height: 120, borderRadius: 100 }}
								alt="Group Image"
								source={{
									uri: baseURL + group.image,
								}}
							/>
						</Box>
					) : (
						<Box position={"relative"}>
							<Badge
								position={"absolute"}
								top={83}
								p={1}
								rounded={50}
								alignSelf="flex-end"
								zIndex={1}
								style={{ backgroundColor: Colors.tertiary }}
							>
								<Icon
									as={<MaterialIcons name="edit" />}
									size={6}
									color={Colors.lightBg}
								/>
							</Badge>
							<Image
								defaultSource={require("../../assets/Media/defaultUserImage.jpg")}
								style={{ width: 120, height: 120, borderRadius: 100 }}
								alt="Group Image"
								source={{
									uri: updatedGroup.image.uri,
								}}
							/>
						</Box>
					)}
				</Pressable>
			</Center>
		</VStack>
	);
};

export default observer(ImageEditGroup);
