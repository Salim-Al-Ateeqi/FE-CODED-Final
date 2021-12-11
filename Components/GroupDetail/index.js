import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  HStack,
  Spinner,
  ScrollView,
  VStack,
  Input,
  Icon,
  Box,
  Divider,
} from "native-base";
import { KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

// components
import { Colors } from "../../utils/Colors";
import ChatItem from "./ChatItem";
import PollItem from "./PollItem";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";
import { socket } from "../../stores/instance";
import { Platform } from "react-native";

const GroupDetail = ({ route, navigation }) => {
  const [newMessage, setNewMessage] = useState("");
  const { group } = route.params;

  if (groupStore.isLoading) {
    return <Spinner />;
  }

  const groupDetailContent = [...group.chat, ...group.polls];

  socket.on("new-message", (payload) => {
    console.log(payload);
    groupStore.receiveMessage(payload);
  });

  //create a sort method using moment

  const content = groupDetailContent.map((element) => {
    if (element.contentType === "chat") {
      return <ChatItem key={element._id} chatData={element} group={group} />;
    } else if (element.contentType === "poll") {
      return <PollItem key={element._id} pollData={element} group={group} />;
    }
  });

  const handleSubmit = () => {
    const message = {
      sentFrom: authStore.user._id,
      message: newMessage,
      members: group.members,
      group: group._id,
    };
    groupStore.sendChatToGroup(group._id, message);
    setNewMessage("");
  };

  return (
    <Box flex={1} bg="#dbd9dc">
      <Divider />

      <VStack mt="5" flex={1}>
        <ScrollView>{content}</ScrollView>
      </VStack>

      <Divider mb="2" />

      <KeyboardAvoidingView>
        <VStack alignItems="center" mb="5">
          <HStack alignItems="center">
            <Input
              color="black"
              placeholder="Message"
              placeholderTextColor={Colors.darkBg}
              variant="filled"
              bg={Colors.lightBg}
              borderRadius="50"
              w="85%"
              py={Platform.OS === "ios" ? "4" : "2"}
              px="3"
              mx="1"
              _focus={{ borderColor: Colors.primary }}
              value={newMessage}
              onChangeText={(newMessage) => setNewMessage(newMessage)}
              borderWidth="0"
              InputLeftElement={
                <Icon
                  size="sm"
                  ml="3"
                  color={Colors.primary}
                  as={<AntDesign name="pluscircle" />}
                />
              }
            />
            <MaterialCommunityIcons
              name="send-circle-outline"
              size={32}
              color={Colors.primary}
              onPress={handleSubmit}
            />
          </HStack>
        </VStack>
      </KeyboardAvoidingView>
    </Box>
  );
};
export default observer(GroupDetail);
