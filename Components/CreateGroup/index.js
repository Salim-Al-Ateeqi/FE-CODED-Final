import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
	Box,
	Button,
	FormControl,
	Input,
	Icon,
	VStack,
	Text,
	useToast,
	Center,
	ScrollView,
	Pressable,
} from "native-base";

import { Image, KeyboardAvoidingView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// components
import { Colors } from "../../utils/Colors";
import groupStore from "../../stores/groupStore";

// stores
import { baseURL } from "../../stores/baseURL";

const CreateGroup = ({ navigation }) => {
	const toast = useToast();
	//   const [image, setImage] = useState({});
	const [group, setGroup] = useState({
		name: "",
		image: { uri: baseURL + `/media/defaultUserImage.jpg` },
	});

	useEffect(() => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();
			if (status === "granted") {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.Emails],
				});

				if (data.length > 0) {
					const contact = data[0];
					console.log(contact);
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

				setGroup({ ...group, image: image });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = () => {
		groupStore.createGroup(group, toast, navigation);
		console.log({ group });
	};

	return (
		<Box flex="1" w="100%" bg="#fff">
			<ScrollView>
				<VStack mt="10" mb="2" mx="1">
					<Pressable onPress={_pickImage}>
						<VStack alignItems="center">
							<Image
								style={{ width: 120, height: 120, borderRadius: 100 }}
								source={{
									uri: group.image.uri,
								}}
							/>
						</VStack>
					</Pressable>

					<Text fontSize="18" bold my="1">
						{groupStore.groups.name}
					</Text>
				</VStack>

				<KeyboardAvoidingView keyboardVerticalOffset={5}>
					<VStack>
						<Center>
							<FormControl w="90%">
								<FormControl.Label>Group Name</FormControl.Label>
								<Input
									_focus={{ borderColor: Colors.Primary }}
									defaultValue={groupStore.groups.name}
									placeholder="Enter group name"
									InputLeftElement={
										<Icon
											as={
												<MaterialIcons name="groups" size={24} color="black" />
											}
											size={5}
											ml="2"
											color="muted.400"
										/>
									}
									onChangeText={(name) => setGroup({ ...group, name })}
								/>
							</FormControl>
						</Center>
					</VStack>
				</KeyboardAvoidingView>
				<Button
					onPress={handleSubmit}
					m="5"
					alignSelf="center"
					w="30%"
					style={{ backgroundColor: Colors.Primary }}
					_text={{
						color: "#fff",
					}}
				>
					Create Group
				</Button>
			</ScrollView>
		</Box>
	);
};

export default observer(CreateGroup);
