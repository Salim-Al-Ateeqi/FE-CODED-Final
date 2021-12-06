import React from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  Pressable,
} from "native-base";
import { observer } from "mobx-react";
import { baseURL } from "../../stores/baseURL";
import styles from "./styles";

const GroupItem = ({ group, navigation }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("GroupDetail", { group: group });
      }}
    >
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        margin="auto"
        marginBottom="5"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: baseURL + group.image,
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Heading size="md" ml="-1">
          {group.name}
        </Heading>
      </Box>
    </Pressable>
  );
};

export default observer(GroupItem);
