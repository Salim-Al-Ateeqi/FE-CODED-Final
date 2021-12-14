import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import {
  HStack,
  Center,
  Container,
  Text,
  Heading,
  Box,
  AspectRatio,
  Stack,
  Button,
} from "native-base";
import { Image } from "react-native";
import { Colors } from "../../assets/Theme/Colors";
import moment from "moment";
// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import groupStore from "../../stores/groupStore";
import styles from "./styles";

const PollItem = ({ pollData, group }) => {
  const [show, setShow] = useState(true);
  const pollCreator = profileStore.profiles.find(
    (user) => user._id === pollData.owner
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
    <Box
      maxW="225"
      rounded="lg"
      // overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
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
      ml="auto"
      mr="auto"
      mt="5"
      mb="5"
    >
      <Box>
        <AspectRatio w="100%" ratio={8 / 12}>
          <Image
            source={{
              uri: pollData.image,
            }}
            alt="image"
            resizeMode="contain"
          />
        </AspectRatio>
        <Center
          bg={Colors.primary}
          _text={{
            color: Colors.lightBg,
            fontWeight: "700",
            fontSize: "xs",
          }}
          position="absolute"
          bottom="0"
          px="3"
          py="1.5"
          borderTopRightRadius="5"
        >
          {pollCreator.profile.name}
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {pollData.title}
          </Heading>
          <Text fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">
            {pollData.vote_average}
          </Text>
        </Stack>
        <Text fontWeight="400">{pollData.overview}</Text>

        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="400"
            >
              Poll Expiration:{" "}
              {moment(pollData.expiration).format("DD-MM-YYYY")}
            </Text>
          </HStack>
        </HStack>
      </Stack>
      {show && (
        <HStack style={styles.center}>
          <Button style={styles.button} onPress={() => handleSubmit("yes")}>
            Yes
          </Button>
          <Button style={styles.button} onPress={() => handleSubmit("no")}>
            No
          </Button>
        </HStack>
      )}
      {!show && (
        <HStack style={styles.center}>
          <Center style={styles.voteCount}>
            <Text style={styles.color}>
              {!pollData.yesVotes ? 0 : pollData.yesVotes} Yes
            </Text>
          </Center>
          <Center style={styles.voteCount}>
            <Text style={styles.color}>
              {!pollData.noVotes ? 0 : pollData.noVotes} No
            </Text>
          </Center>
        </HStack>
      )}
    </Box>
  );
};

export default observer(PollItem);
