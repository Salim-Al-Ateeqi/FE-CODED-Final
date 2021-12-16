import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  useToast,
  Image,
  HStack,
} from "native-base";
import { Platform } from "react-native";

// components
import { Colors } from "../../assets/Theme/Colors";

const HelpAndFeedBack = () => {
  const [feedbackData, setFeedbackData] = useState({
    email: "",
    feedback: "",
  });
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidFeedback, setIsInvalidFeedback] = useState(false);
  const toast = useToast();
  const id = "prevent-duplicate";

  const handleSubmit = () => {
    if (feedbackData.email === "") return setIsInvalidEmail(true);
    if (feedbackData.feedback.trim() === "")
      return setIsInvalidFeedback(true), setIsInvalidEmail(false);

    setFeedbackData({
      email: "",
      feedback: "",
    });
    setIsInvalidEmail(false);
    setIsInvalidFeedback(false);
    if (!toast.isActive(id)) {
      toast.show({
        id,
        title: "Thank you for your feedback.",
        status: "success",
        placement: "top",
        duration: 2000,
        isClosable: false,
      });
    }
  };

  return (
    <Center flex={1} px="3">
      <Box p="2" w="90%" maxW="400" py="8">
        <HStack space={4} alignItems={"center"}>
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Send Feedback
          </Heading>
          <Image
            size={"xs"}
            source={require("../../assets/Media/PollLogo.png")}
          />
        </HStack>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Tell us what you love about the app, or what we could be doing better.
        </Heading>
        <VStack space={5} mt="5">
          <FormControl isInvalid={isInvalidEmail}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              py={Platform.OS === "ios" ? "4" : "2"}
              enablesReturnKeyAutomatically={true}
              returnKeyType="next"
              defaultValue={feedbackData.email}
              placeholder="Enter email"
              type="email"
              bg={"#fff"}
              keyboardType="email-address"
              _focus={{ borderColor: Colors.secondary }}
              onChangeText={(email) =>
                setFeedbackData({ ...feedbackData, email })
              }
            />
            <FormControl.ErrorMessage>
              Please enter your email.
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={isInvalidFeedback}>
            <FormControl.Label>Describe Your Feedback</FormControl.Label>
            <Input
              returnKeyType="send"
              enablesReturnKeyAutomatically={true}
              multiline={true}
              defaultValue={feedbackData.feedback}
              bg={"#fff"}
              h={100}
              placeholder="Enter feedback"
              _focus={{ borderColor: Colors.secondary }}
              onChangeText={(feedback) =>
                setFeedbackData({ ...feedbackData, feedback })
              }
            />
            <FormControl.ErrorMessage>
              Please describe your feedback.
            </FormControl.ErrorMessage>
          </FormControl>

          <Button
            mt="2"
            style={{ backgroundColor: Colors.yellow }}
            onPress={handleSubmit}
          >
            Send
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default HelpAndFeedBack;
