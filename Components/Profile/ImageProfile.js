import React, { useEffect } from "react";
import { Icon, Text, VStack, Pressable, Box, Badge } from "native-base";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

// stores
import { baseURL } from "../../stores/baseURL";

const ImageProfile = ({
	userProfile,
	imageChanged,
	setImageChanged,
	updatedProfile,
	setUpdatedProfile,
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
				const match = /\.(\w+)$/.exec(filename);
				const image = {
					uri: localUri,
					name: filename,
					type: match ? `image/${match[1]}` : `image`,
				};
				setUpdatedProfile({ ...userProfile.profile, image: image });
				setImageChanged(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<VStack mt="10" mb="2" mx="1" alignItems="center">
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
							colorScheme="coolGray"
						>
							<Icon
								as={<MaterialIcons name="edit" />}
								size={6}
								color="muted.400"
							/>
						</Badge>

						<Image
							style={{ width: 120, height: 120, borderRadius: 100 }}
							source={{ uri: baseURL + userProfile.profile.image }}
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
							colorScheme="coolGray"
						>
							<Icon
								as={<MaterialIcons name="edit" />}
								size={6}
								color="muted.400"
							/>
						</Badge>
						<Image
							style={{ width: 120, height: 120, borderRadius: 100 }}
							source={{ uri: updatedProfile.image.uri }}
						/>
					</Box>
				)}
			</Pressable>

			<Text fontSize="18" bold my="1">
				{userProfile.profile.name}
			</Text>

			<Text fontSize="14" my="1">
				{userProfile.profile.status}
			</Text>
		</VStack>
	);
};

export default ImageProfile;
