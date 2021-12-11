import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { HStack, Center, Text, VStack, Button } from "native-base";
import { Image } from "react-native";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import { Colors } from "../../utils/Colors";
import groupStore from "../../stores/groupStore";

const PollItem = ({ pollData, group }) => {
  const [show, setShow] = useState(true);
  const pollCreator = profileStore.profiles.find(
    (user) => user._id === pollData.owner
  );
  const userVoted = pollData.votes.find(
    (vote) => vote.user === authStore.user._id
  );

  useEffect(() => {
    const userVoted = pollData.votes.find(
      (vote) => vote.user === authStore.user._id
    );
    if (userVoted) setShow(false);
  }, []);

  const handleSubmit = (vote) => {
    const userVote = {
      user: authStore.user._id,
      vote,
    };
    groupStore.submitVote(group._id, pollData._id, userVote);
    setShow(false);
  };
  return (
    <VStack space={2} flex={1} m="4">
      <Center mx="2" px={3} borderRadius={50}>
        <Image
          style={{ width: 150, height: 200 }}
          alt={`Image poster for the movie ${pollData.title}`}
          source={{
            uri: pollData.image,
          }}
        />
        <Text color="#fff">{pollData.title}</Text>
        <HStack>
          <Text color="#fff">Created by {pollCreator.profile.name}</Text>
        </HStack>
        <HStack>
          {show && (
            <>
              <Button
                mt="2"
                style={{ backgroundColor: Colors.primary }}
                mx={1}
                width={20}
                onPress={() => handleSubmit("no")}
              >
                No
              </Button>
              <Button
                mt="2"
                style={{ backgroundColor: Colors.primary }}
                mx={1}
                width={20}
                onPress={() => handleSubmit("yes")}
              >
                Yes
              </Button>
            </>
          )}
        </HStack>
      </Center>
    </VStack>
  );
};

export default observer(PollItem);
