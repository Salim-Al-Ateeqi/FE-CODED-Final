import React from "react";
import { observer } from "mobx-react-lite";
import { Image } from "react-native";
import { Heading, HStack, Pressable } from "native-base";

// stores
import { baseURL } from "../../stores/baseURL";

const GroupLeftImage = ({ group, navigation }) => {
  // REVIEW: If it's a regular string with no variables interpolated, use quotations "" not 39foora ``
  const defaultImage = baseURL + `/media/defaultUserImage.jpg`;
  // REVIEW: Remove console.log
  console.log(defaultImage);
  return (
    <Pressable onPress={() => navigation.navigate("EditGroup", { group })}>
      <HStack space={4} alignItems="center" mb="2">
        <Image
          alt="Group Image."
          style={{
            width: 45,
            height: 45,
            borderRadius: 30,
            marginBottom: 5,
          }}
          defaultSource={require("../../utils/Media/defaultUserImage.jpg")}
          source={{
            uri: baseURL + group.image,
          }}
        />
        <Heading size={"md"}>{group.name}</Heading>
      </HStack>
    </Pressable>
  );
};

export default observer(GroupLeftImage);
