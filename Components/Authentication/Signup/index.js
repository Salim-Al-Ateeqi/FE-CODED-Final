import React, { useState } from "react";
import { observer } from "mobx-react";
import IntlPhoneInput from "react-native-intl-phone-input";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  useToast,
  ScrollView,
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// components
import { Colors } from "../../../assets/Theme/Colors";
import SpinnerPage from "../../SpinnerPage";

// stores
import authStore from "../../../stores/authStore";

const Signup = ({ navigation }) => {
  const [user, setUser] = useState({
    phoneNumber: "",
    password: "",
    profile: { name: "" },
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(false);
  const toast = useToast();

  // if (authStore.isLoading) return <SpinnerPage />;

  // To handle the IntlPhoneInput library we need to pass this function
  const handleNumber = ({
    dialCode,
    unmaskedPhoneNumber,
    phoneNumber,
    isVerified,
  }) => {
    const userNumber = phoneNumber.replace(" ", "");
    const newNumber = `${dialCode}${userNumber}`;
    setUser({ ...user, phoneNumber: newNumber.replace("-", "") });
  };

  // To show the incorrect password for Confirm password field
  const handleCheckPassword = () => {
    confirmPassword === user.password
      ? setIsValidStatus(false)
      : setIsValidStatus(true);
  };

  const handleSubmit = () => {
    if (confirmPassword === user.password) {
      authStore.register(user, toast, navigation);
    }
    handleCheckPassword();
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView>
        <Center>
          <Box safeArea p="2" py="2" w="100%" maxW="290">
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
              Register to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Phone Number</FormControl.Label>
                <IntlPhoneInput
                  containerStyle={{
                    borderColor: "#d4d4d4",
                    borderWidth: 0.5,
                    height: 50,
                    borderRadius: 5,
                  }}
                  flagStyle={{ fontSize: 20, marginRight: 2 }}
                  phoneInputStyle={{
                    lineHeight: 18,
                    marginLeft: 5,
                    // if english or arabic
                    // textAlign: i18nStore.language === "en" ? "left" : "right",
                  }}
                  onChangeText={handleNumber}
                  defaultCountry="KW"
                  modalCountryItemCountryNameStyle={{
                    fontSize: 13,
                    marginLeft: 8,
                  }}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  bg="#fff"
                  h="50"
                  type="text"
                  placeholder="Enter your Name"
                  _focus={{ borderColor: Colors.secondary }}
                  onChangeText={(name) =>
                    setUser({ ...user, profile: { name: name } })
                  }
                />
              </FormControl>

              <FormControl isInvalid={isValidStatus}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  bg="#fff"
                  h="50"
                  type="password"
                  placeholder="Enter your password"
                  _focus={{ borderColor: Colors.secondary }}
                  onChangeText={(password) => setUser({ ...user, password })}
                />
              </FormControl>

              <FormControl isInvalid={isValidStatus}>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  keyboardType="name-phone-pad"
                  returnKeyType="next"
                  bg="#fff"
                  h="50"
                  type="password"
                  placeholder="Confirm your password"
                  _focus={{ borderColor: Colors.secondary }}
                  onChangeText={(value) => setConfirmPassword(value)}
                />
                <FormControl.ErrorMessage>
                  Passwords do not match.
                </FormControl.ErrorMessage>
              </FormControl>

              <Button
                mt="2"
                style={{ backgroundColor: Colors.secondary }}
                onPress={handleSubmit}
              >
                Register
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I already have an account.{" "}
                </Text>
                <Link
                  _text={{
                    color: Colors.primary,
                    fontWeight: "bold",
                    fontSize: "sm",
                  }}
                  onPress={() => navigation.navigate("Signin")}
                >
                  Login
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default observer(Signup);
