import React from "react";
import {
  Box,
  Text,
  HStack,
  Pressable,
  Avatar,
  VStack,
  Spacer,
} from "native-base";
import { observer } from "mobx-react";

const GroupItem = ({ group, navigation }) => {
  return (
    <Box>
      <Pressable onPress={() => console.log("You touched me")} bg="white">
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <Avatar size="48px" source={{ uri: group.image }} />
            <VStack>
              <Text color="coolGray.800" _dark={{ color: "warmGray.50" }} bold>
                {group.name}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );
};

export default observer(GroupItem);
