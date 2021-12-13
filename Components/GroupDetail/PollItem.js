import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { HStack, Center, Text, VStack, Button, Container } from "native-base";
import { Image } from "react-native";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import { Colors } from "../../assets/Theme/Colors";
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
    <Container space={2} flex={1} m="1" style={styles.card}>
      <Image
        style={styles.image}
        alt={`Image poster for the movie ${pollData.title}`}
        source={{
          uri: pollData.image,
        }}
      />
      <Text style={styles.title}>{pollData.title}</Text>
      <Text style={styles.by}>Created by {pollCreator.profile.name}</Text>
      {show && (
        <HStack>
          <Button style={styles.button} onPress={() => handleSubmit("no")}>
            No
          </Button>
          <Button style={styles.button} onPress={() => handleSubmit("yes")}>
            Yes
          </Button>
        </HStack>
      )}
      {/* {!show && (
        <HStack flex={1} px={5} space={10}>
          <Text>{!pollData.noVotes ? 0 : pollData.noVotes} No</Text>
          <Text>{!pollData.yesVotes ? 0 : pollData.yesVotes} Yes</Text>
        </HStack>
      )} */}
    </Container>
  );
};

export default observer(PollItem);
