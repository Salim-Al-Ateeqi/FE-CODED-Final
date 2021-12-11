import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  ScrollView,
  Spinner,
  Box,
  Divider,
  VStack,
  HStack,
  Button,
} from "native-base";

// components
import GroupItem from "./GroupItem";
import Search from "../Search/Search";
import { Colors } from "../../utils/Colors";

// stores
import groupStore from "../../stores/groupStore";
import authStore from "../../stores/authStore";
import { socket } from "../../stores/instance";

const Home = ({ navigation }) => {
  const [query, setQuery] = useState("");
  if (groupStore.isLoading) {
    return <Spinner />;
  }

  // REVIEW: A cleaner way ==>   const userId = authStore.user._id ?? "";
  // The ?? means take the left side, if it doesn't exist take the right side
  // You can also use || instead of ??
  const userId = authStore.user ? authStore.user._id : "";

  const data = authStore.user;
  socket.emit("authUser", data);

  //    REVIEW: You don't need to use _groups and __groups, as they are defined inside the function only, just say group in both filters
  const groupList = groupStore.groups
    .filter((_group) => _group.name.toLowerCase().includes(query.toLowerCase()))
    .filter((__group) => __group.members.includes(userId))
    .map((group) => (
      <GroupItem navigation={navigation} group={group} key={group._id} />
    ));

  const handlePress = () => {
    // REVIEW: Condition makes no sense
    if (authStore) {
      navigation.navigate("CreateGroup");
    }
  };

  return (
    <Box bg="white" flex="1">
      <ScrollView>
        <Divider />
        <VStack mt="1">
          <Search setQuery={setQuery} />
          <HStack justifyContent="space-between">
            <Button colorScheme="darkBlue" variant="link">
              Broadcast List
            </Button>

            <Button colorScheme="darkBlue" variant="link" onPress={handlePress}>
              Create Group
            </Button>
          </HStack>
          <Divider />
        </VStack>

        {groupList}
      </ScrollView>
    </Box>
  );
};

export default observer(Home);
