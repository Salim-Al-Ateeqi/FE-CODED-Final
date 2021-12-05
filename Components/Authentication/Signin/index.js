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
} from "native-base";
import React, { useState } from "react";
import authStore from "../../../stores/authStore";
import { observer } from "mobx-react";

const Signin = () => {
  const [credentials, setCredentials] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleSubmit = () => {
    authStore.login(credentials);
  };
  return (
    <Box>
      <Heading size="lg" fontWeight="600">
        Sign in
      </Heading>
      <Heading mt="2" fontWeight="medium" size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Phone Number</FormControl.Label>
          <Input
            keyboardType={"number-pad"}
            onChangeText={(phoneNumber) =>
              setCredentials({ ...credentials, phoneNumber })
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
        <Button mt="2" colorScheme="indigo" onPress={handleSubmit}>
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text fontSize="sm">I need a new account. </Text>
          <Link
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm",
            }}
            onPress={() => navigation.replace("Signup")}
          >
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default observer(Signin);
