import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
  useToast,
  Center,
} from "native-base";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import groupStore from "../../stores/groupStore";

// NEXT STEP: Need to send params and send group from groupDetail
// const {group} = route.params
const AddMembers = ({ navigation }) => {
  const [member, setMember] = useState({
    phoneNumber: "",
  });

  const toast = useToast();

  const handleSubmit = () => {
    groupStore.addMembersToGroup(member, toast, navigation);
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
                  keyboardType="number-pad"
                  onChangeText={(phoneNumber) =>
                    setMember({ ...member, phoneNumber })
                  }
                />
              </FormControl>

              <Button mt="2" colorScheme="success" onPress={handleSubmit}>
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
