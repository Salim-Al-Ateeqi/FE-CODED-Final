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
  useDisclose,
  KeyboardAvoidingView,
  useToast,
} from "native-base";
import { TouchableOpacity, Platform } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import moment from "moment";

// components
import { Colors } from "../../assets/Theme/Colors";
import ChatItem from "./ChatItem";
import PollItem from "./PollItem";
import StaggerButton from "./StaggerButton";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";
import { socket } from "../../stores/instance";

const GroupDetail = ({ route, navigation }) => {
  const [newMessage, setNewMessage] = useState("");
  const { isOpen, onToggle, onClose } = useDisclose();
  const { group } = route.params;

  const toast = useToast();

  if (groupStore.isLoading) {
    return <Spinner />;
  }

  const groupDetailContent = [...group.chat, ...group.polls];

  const sortedGroupContent = groupDetailContent.sort(
    (a, b) => moment(a.createdAt) - moment(b.createdAt)
  );

  const content = sortedGroupContent.map((element) => {
    if (element.contentType === "chat") {
      return <ChatItem key={element._id} chatData={element} group={group} />;
    } else if (element.contentType === "poll") {
      return <PollItem key={element._id} pollData={element} group={group} />;
    }
  });

  socket.on("navigate-home", () => {
    toast.show({
      title: "Group Has been deleted!",
      status: "info",
      placement: "top",
      duration: 1500,
    });
    navigation.navigate("Groups");
  });

  const handleSubmit = () => {
    if (newMessage === "") return;
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
    <KeyboardAvoidingView
      h={{
        base: "full",
      }}
      behavior={Platform.OS === "ios" && "padding"}
    >
      <Divider />
      <VStack flex={1} justifyContent="flex-end" bg={"#C3C3C3"}>
        <ScrollView bg="#fff" height="50%">
          {content}
        </ScrollView>
        <StaggerButton
          navigation={navigation}
          group={group}
          onToggle={onToggle}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Divider mb="2" />
        <HStack
          alignItems="center"
          justifyContent={"center"}
          mb={Platform.OS === "ios" ? 6 : 3}
          py={1}
        >
          <Input
            returnKeyType="send"
            returnKeyLabel="send"
            onSubmitEditing={handleSubmit}
            color="black"
            placeholder="Message"
            placeholderTextColor={Colors.darkBg}
            variant="filled"
            bg="#fff"
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
              <TouchableOpacity activeOpacity={0.7} onPress={onToggle}>
                <Icon
                  size="sm"
                  ml="3"
                  color={Colors.primary}
                  as={<AntDesign name="pluscircle" />}
                />
              </TouchableOpacity>
            }
          />
          <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit}>
            <MaterialCommunityIcons
              name="send-circle-outline"
              size={32}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};
export default observer(GroupDetail);
