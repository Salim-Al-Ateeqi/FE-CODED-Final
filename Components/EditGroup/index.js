import React, { useState } from "react";
import { observer } from "mobx-react";
import {
  Text,
  VStack,
  ScrollView,
  Button,
  Box,
  Divider,
  useToast,
  HStack,
} from "native-base";

// components
import { Colors } from "../../assets/Theme/Colors";
import MemberItem from "./MemberItem";
import ImageEditGroup from "./ImageEditGroup";
import InputEditGroup from "./InputEditGroup";
import AddMembersButton from "./AddMembersButton";
import DeleteGroupButton from "./DeleteGroupButton";

// stores
import profileStore from "../../stores/ProfileStore";
import groupStore from "../../stores/groupStore";
import { socket } from "../../stores/instance";

const EditGroup = ({ route, navigation }) => {
  const [focusOnInput, setFocusOnInput] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [updatedGroup, setUpdatedGroup] = useState({
    name: "",
    image: "",
  });
  const toast = useToast();

  const { group } = route.params;

  const groupMembers = profileStore.profiles
    .filter((profile) => group.members.includes(profile._id))
    .map((member) => <MemberItem key={member._id} member={member} />);

  const handleUpdate = () => {
    groupStore.updateGroup(group._id, updatedGroup, navigation, toast);
  };

  socket.on("navigate-home", () => {
    toast.show({
      title: "Group Has been deleted!",
      status: "info",
      placement: "top",
      duration: 1500,
    });
    navigation.navigate("Groups");
  });

  return (
    <Box flex="1" w="100%" bg="#fff">
      <ScrollView>
        <ImageEditGroup
          group={group}
          updatedGroup={updatedGroup}
          setUpdatedGroup={setUpdatedGroup}
          imageChanged={imageChanged}
          setImageChanged={setImageChanged}
        />

        <VStack flex={1} space="5">
          <InputEditGroup
            group={group}
            updatedGroup={updatedGroup}
            setUpdatedGroup={setUpdatedGroup}
            imageChanged={imageChanged}
            focusOnInput={focusOnInput}
            handleUpdate={handleUpdate}
          />

          <Button
            alignSelf={"flex-end"}
            w="25%"
            mr={3}
            style={{ backgroundColor: Colors.primary }}
            _text={{
              color: Colors.lightBg,
            }}
            onPress={handleUpdate}
          >
            Save
          </Button>

          <VStack mb={5}>
            <HStack w="100%">
              <Text fontSize={12} ml="3" mb="2">
                {group.members.length} MEMBERS
              </Text>
            </HStack>
            <Divider />

            <AddMembersButton navigation={navigation} group={group} />
            <Divider />
            {groupMembers}
          </VStack>
          <Box flex={1} justifyContent={"flex-end"}>
            <DeleteGroupButton group={group} navigation={navigation} />
            <Divider mb={2} />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default observer(EditGroup);
