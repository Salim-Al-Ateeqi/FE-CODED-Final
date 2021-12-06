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
import authStore from "../../../stores/authStore";
import { observer } from "mobx-react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";

const Signin = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const toast = useToast();

  const handleSubmit = () => {
    authStore.login(credentials, toast, navigation);
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
              Welcome
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Sign-in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Phone Number</FormControl.Label>
                <Input
                  keyboardType="number-pad"
                  onChangeText={(username) =>
                    setCredentials({ ...credentials, username })
                  }
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  onChangeText={(password) =>
                    setCredentials({ ...credentials, password })
                  }
                />
              </FormControl>

              <Button mt="2" colorScheme="success" onPress={handleSubmit}>
                Sign-in
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I need an account.{" "}
                </Text>
                <Link
                  _text={{
                    color: "#404040",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={() => navigation.navigate("Signup")}
                >
                  Sign-up
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default observer(Signin);
