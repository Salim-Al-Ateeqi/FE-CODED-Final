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
  Badge,
} from "native-base";

import { Image, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// components
import { Colors } from "../../assets/Theme/Colors";
import groupStore from "../../stores/groupStore";

// stores
import { baseURL } from "../../stores/baseURL";

const CreateGroup = ({ navigation }) => {
  const [group, setGroup] = useState({
    name: "",
    image: "/media/defaultGroupImage.jpg",
  });
  const [isInvalidStatus, setIsInvalidStatus] = useState(false);

  // Check if the user change the image.
  const [imageChanged, setImageChanged] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
        }
      }
    })();
  }, []);

  const toast = useToast();

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
        setImageChanged(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (group.name === "") return setIsInvalidStatus(true);
    groupStore.createGroup(group, toast, navigation);
  };

  return (
    <Box flex="1" w="100%" bg="#fff">
      <ScrollView>
        <VStack mt="10" mb="2" mx="1">
          <Pressable onPress={_pickImage}>
            <VStack alignItems="center">
              {!imageChanged ? (
                <Box position={"relative"}>
                  <Badge
                    position={"absolute"}
                    top={81}
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
                    source={{ uri: group.image.uri }}
                  />
                </Box>
              )}
            </VStack>
          </Pressable>

          <Text fontSize="18" bold my="1">
            {groupStore.groups.name}
          </Text>
        </VStack>

        <KeyboardAvoidingView keyboardVerticalOffset={5}>
          <VStack>
            <Center>
              <FormControl w="90%" isInvalid={isInvalidStatus}>
                <FormControl.Label>Group Name</FormControl.Label>
                <Input
                  maxLength={20}
                  py={Platform.OS === "ios" ? "4" : "2"}
                  _focus={{ borderColor: Colors.primary }}
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

                <FormControl.ErrorMessage>
                  Please enter group name
                </FormControl.ErrorMessage>
              </FormControl>
            </Center>
          </VStack>
        </KeyboardAvoidingView>
        <Button
          onPress={handleSubmit}
          m="5"
          alignSelf="center"
          w="30%"
          style={{ backgroundColor: Colors.primary }}
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
