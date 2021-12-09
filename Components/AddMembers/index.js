import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
  Center,
} from "native-base";

import React, { useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ScrollView } from "react-native-gesture-handler";

// components
import { Colors } from "../../utils/Colors";

// stores
import groupStore from "../../stores/groupStore";
import profileStore from "../../stores/ProfileStore";

const AddMembers = ({ navigation, route }) => {
  const { group } = route.params;
  const [phoneNumber, setPhoneNumber] = useState({
    phoneNumber: "",
  });

  // const newMember = profileStore.profiles.find(
  //   (profile) => profile.phoneNumber === member.phoneNumber
  // );
  const toast = useToast();

  const handleSubmit = () => {
    groupStore.addMembersToGroup(phoneNumber, group, navigation, toast);
  };
  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <Center mt="20">
          <Box safeArea p="2" py="8" w="100%" maxW="290">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Add Members
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Phone Number</FormControl.Label>
                <Input
                  placeholder="Enter Member"
                  keyboardType="number-pad"
                  _focus={{ borderColor: Colors.Primary }}
                  onChangeText={(phoneNumber) =>
                    setPhoneNumber({ ...phoneNumber, phoneNumber })
                  }
                />
              </FormControl>

              <Button
                mt="2"
                style={{ backgroundColor: Colors.Primary }}
                onPress={handleSubmit}
              >
                Add Member
              </Button>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default AddMembers;
