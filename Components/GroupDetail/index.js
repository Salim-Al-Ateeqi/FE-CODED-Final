import { observer } from "mobx-react";
import { Spinner } from "native-base";
import React from "react";
import {
  VStack,
  Input,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  Divider,
  Heading,
} from "native-base";
import groupStore from "../../stores/groupStore";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

const GroupDetail = ({ route, navigation }) => {
  const { group } = route.params;

  if (groupStore.isLoading) {
    return <Spinner />;
  }

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <VStack flex={1} bg="white" w="100%">
          <VStack
            space={0}
            w="100%"
            h="50%"
            // divider={
            //   <Box px="2">
            //     <Divider />
            //   </Box>
            // }
          ></VStack>
          <VStack width="100%" space={0} alignItems="center">
            <Input
              placeholder="type message"
              variant="filled"
              width="100%"
              bg="muted.200"
              borderRadius="10"
              py="1"
              px="2"
              placeholderTextColor="muted.400"
              _hover={{ bg: "gray.200", borderWidth: 0 }}
              borderWidth="0"
              _web={{
                _focus: { style: { boxShadow: "none" } },
              }}
              // InputLeftElement={<Icon ml="2" size="5" color="gray.500" />}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};
export default observer(GroupDetail);
