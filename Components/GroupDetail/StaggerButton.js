import React from "react";
import { Box, IconButton, Stagger, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../assets/Theme/Colors";
import styles from "./styles";

const StaggerButton = ({ navigation, group, onToggle, isOpen, onClose }) => {
  return (
    <Box ml={5} alignItems="flex-start">
      <Stagger
        visible={isOpen}
        initial={{
          opacity: 0,
          scale: 0,
          translateY: 34,
        }}
        animate={{
          translateY: 0,
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            mass: 0.8,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
        exit={{
          translateY: 34,
          scale: 0.5,
          opacity: 0,
          transition: {
            duration: 100,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
      >
        <IconButton
          onPress={() => {
            navigation.navigate("MoviePoll", { group });
            onClose();
          }}
          variant="solid"
          icon={<Icon as={MaterialIcons} size="6" name="poll" />}
          style={styles.pollButton}
        />
      </Stagger>
    </Box>
  );
};

export default StaggerButton;
