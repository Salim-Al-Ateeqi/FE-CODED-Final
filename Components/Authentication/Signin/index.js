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
  useToast
} from "native-base";
import React, { useState } from "react";
import authStore from "../../../stores/authStore";
import { observer } from "mobx-react";

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
