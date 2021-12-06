import {
    Box,
    Button,
    FormControl,
    Heading,
    Input,
    VStack,
    Center,
  } from "native-base";
  import React, { useState } from "react";
  import { observer } from "mobx-react";
  
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { ScrollView } from "react-native-gesture-handler";
  
  const Index = ({ navigation }) => {
    const [newPoll, setNewPoll] = useState({
        title: '',
        image: '',
        expiration: ''
    });

    //NOTE :
    //Still in progress!
    
    const handleSubmit = () => {
        
    }
    
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
                Create A New Poll!
              </Heading>

            <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Title</FormControl.Label>
                  <Input
                    onChangeText={() =>
                      setCredentials({})
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Expiration</FormControl.Label>
                  <Input
                    onChangeText={() =>
                      setCredentials({})
                    }
                  />
                </FormControl>
            </VStack>

  
                <Button mt="2" colorScheme="success" onPress={handleSubmit}>
                  Create Poll
                </Button>

            </Box>
          </Center>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  };
  
  export default observer(Index);
  