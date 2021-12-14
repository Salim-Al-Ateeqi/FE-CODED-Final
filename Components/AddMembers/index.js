import React, { useState } from "react";
// import { Text, View, Button } from "react-native";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native";

import IntlPhoneInput from "react-native-intl-phone-input";
import profileStore from "../../stores/ProfileStore";
// import ViewMembers from "../EditGroup/MemberItem";
import { Colors } from "../../assets/Theme/Colors";
import {
  Box,
  Button,
  FormControl,
  Heading,
  VStack,
  useToast,
  Center,
  HStack,
  Divider,
  Text,
} from "native-base";
import SpinnerPage from "../SpinnerPage/index";
import groupStore from "../../stores/groupStore";

const AddMembers = ({ navigation, route }) => {
  const { group } = route.params;
  const toast = useToast();

  if (profileStore.isloading) return <SpinnerPage />;

  const filteredProfiles = profileStore.profiles.filter(
    (profile) => !group.members.includes(profile._id)
  );

  const K_OPTIONS = filteredProfiles.map((profile) => {
    let profilesList = {
      id: `${profile._id}`,
      item: `${profile.profile.name}`,
    };
    return profilesList;
  });

  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSubmit = () => {
    let membersId = [];
    selectedMembers.map((member) => membersId.push(member.id));
    // console.log("membersId:", membersId);
    groupStore.addMembersToGroup(membersId, group, navigation, toast);
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <Center mt="10">
          <Box safeArea p="2" py="2" w="100%" maxW="90%">
            <VStack space={3} mt="5">
              <SelectBox
                arrowIconColor={Colors.primary}
                searchIconColor={Colors.primary}
                toggleIconColor={Colors.primary}
                multiOptionContainerStyle={{
                  backgroundColor: Colors.primary,
                }}
                label="New Members List:"
                options={K_OPTIONS}
                selectedValues={selectedMembers}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
              />
            </VStack>
            <Divider />
            <VStack mb={5} p="5">
              <Button
                mt="2"
                style={{ backgroundColor: Colors.primary }}
                onPress={handleSubmit}
              >
                Add Members
              </Button>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAwareScrollView>
  );

  function onMultiChange() {
    return (item) => setSelectedMembers(xorBy(selectedMembers, [item], "id"));
  }
};

export default AddMembers;
