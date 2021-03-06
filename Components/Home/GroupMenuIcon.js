import React, { useState } from "react";
import { observer } from "mobx-react";
import { Actionsheet, Icon, Box, Text, Divider, useToast } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Path } from "react-native-svg";

// components
import AlertOnDelete from "../AlertOnDelete";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";

const GroupMenuIcon = ({ group, navigation, isOpen, onOpen, onClose }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const toast = useToast();
  const showAlert = () => setOpenAlert(true);

  const handleDelete = () => {
    groupStore.deleteGroup(group._id, toast);
    setOpenAlert(false);
    onClose();
  };

  const handleLeave = () => {
    setOpenAlert(false);
    onClose();
    groupStore.leaveGroup(group._id, authStore.user._id, navigation, toast);
  };

  return (
    <>
      <MaterialCommunityIcons
        onPress={onOpen}
        name="dots-vertical"
        size={24}
        color="black"
      />

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              fontSize="16"
              color="gray.500"
              _dark={{
                color: "gray.300",
              }}
            >
              {group.name}
            </Text>
          </Box>

          <Actionsheet.Item
            onPress={() => {
              navigation.navigate("EditGroup", { group: group });
              onClose();
            }}
            startIcon={
              <Icon
                as={MaterialIcons}
                color="trueGray.400"
                mr="1"
                size="6"
                name="info"
              />
            }
          >
            Group Info
          </Actionsheet.Item>

          {authStore.user._id === group.owner ? (
            <Actionsheet.Item
              onPress={showAlert}
              startIcon={
                <Icon
                  as={MaterialIcons}
                  color="trueGray.400"
                  mr="1"
                  size="6"
                  name="delete"
                />
              }
            >
              Delete Group
            </Actionsheet.Item>
          ) : (
            <Actionsheet.Item
              onPress={showAlert}
              startIcon={
                <Icon
                  as={<MaterialIcons />}
                  color="trueGray.400"
                  mr="1"
                  size="6"
                  name="logout"
                />
              }
            >
              Exit Group
            </Actionsheet.Item>
          )}

          <Divider mt={2} />

          <Actionsheet.Item
            p={3}
            onPress={onClose}
            startIcon={
              <Icon
                color="trueGray.400"
                mr="1"
                h="24"
                w="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <Path d="M12.0007 10.5862L16.9507 5.63623L18.3647 7.05023L13.4147 12.0002L18.3647 16.9502L16.9507 18.3642L12.0007 13.4142L7.05072 18.3642L5.63672 16.9502L10.5867 12.0002L5.63672 7.05023L7.05072 5.63623L12.0007 10.5862Z" />
              </Icon>
            }
          >
            Cancel
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <AlertOnDelete
        group={group}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        handleDelete={handleDelete}
        handleLeave={handleLeave}
      />
    </>
  );
};

export default observer(GroupMenuIcon);
