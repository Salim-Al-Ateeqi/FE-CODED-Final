import React from "react";
import { observer } from "mobx-react";
import { HStack, VStack, Center, Text, Box } from "native-base";
import { Image } from "react-native";

import moment from "moment";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import { baseURL } from "../../stores/baseURL";
import { Colors } from "../../assets/Theme/Colors";

const ChatItem = ({ chatData, group }) => {
  const userProfile = profileStore.profiles.find(
    (profile) => profile._id === chatData.sentFrom
  );

  return (
    <Box>
      {authStore.user._id === chatData.sentFrom ? (
        <HStack space={2} flex={1} m="4" reversed justifyContent={"flex-end"}>
          <Image
            defaultSource={require("../../assets/Media/defaultUserImage.jpg")}
            style={{ width: 40, height: 40, borderRadius: 50 }}
            alt="Image of the user who sent the message."
            source={{
              uri: baseURL + userProfile.profile.image,
            }}
          />
          <Center
            mx="2"
            bg={Colors.secondary}
            px={4}
            borderRadius={15}
            maxW={250}
            borderBottomRightRadius={1}
          >
            <VStack flex={1}>
              <HStack
                mt={2}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Text color={Colors.lightBg} fontWeight={"bold"}>
                  {chatData.message}
                </Text>
              </HStack>
              <HStack
                alignItems={"center"}
                justifyContent={"flex-end"}
                flex={1}
                mb={1}
              >
                <Text fontSize={10} color={"#E0E0E0"}>
                  {moment(chatData.createdAt).format("LT")}
                </Text>
              </HStack>
            </VStack>
          </Center>
        </HStack>
      ) : (
        <HStack space={2} flex={1} m="4">
          <Image
            defaultSource={require("../../assets/Media/defaultUserImage.jpg")}
            style={{ width: 40, height: 40, borderRadius: 50 }}
            alt="Image of the user who sent the message."
            source={{
              uri: baseURL + userProfile.profile.image,
            }}
          />
          <Center
            mx="2"
            bg={Colors.tertiary}
            px={3}
            py={1}
            borderRadius={15}
            borderBottomLeftRadius={1}
          >
            <VStack flex={1}>
              <HStack alignItems={"center"} justifyContent={"flex-start"}>
                <Text color={Colors.primary} fontSize={12} fontWeight={"bold"}>
                  {userProfile.profile.name}
                </Text>
              </HStack>
              <HStack
                my={1}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Text color={Colors.lightBg} fontWeight={"bold"}>
                  {chatData.message}
                </Text>
              </HStack>

              <HStack
                alignItems={"center"}
                justifyContent={"flex-end"}
                flex={1}
                mb={1}
              >
                <Text fontSize={10} color={"#E0E0E0"}>
                  {moment(chatData.createdAt).format("LT")}
                </Text>
              </HStack>
            </VStack>
          </Center>
        </HStack>
      )}
    </Box>
  );
};

export default observer(ChatItem);
