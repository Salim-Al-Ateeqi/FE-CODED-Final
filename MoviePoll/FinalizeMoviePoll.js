import React, { useState } from "react";
import { View, Text } from 'react-native';
import { observer } from "mobx-react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import {
    Box,
    Button,
    FormControl,
    Heading,
    Input,
    VStack,
    Center,
    Image
} from "native-base";
import imdbStore from "../stores/imdbStore";

const FinalizeMoviePoll = ({ route, navigation, group }) => {
  const { movie } = route.params;
    const [] = useState({});

    return (
        <KeyboardAwareScrollView>
        <ScrollView>
          <Center>
          <Box safeArea p="1" py="8" w="100%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Add Expiration
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <Center>
                    <FormControl.Label>Selected Movie</FormControl.Label>
                      <Image
                          source={{ uri: `https://image.tmdb.org/t/p/w500`+movie.poster_path }}
                          alt={movie.title}
                          style={{ width: 150, height: 200, padding: 5 }}
                      />
                      <Text>Selected Movie</Text>
                      <Text>{movie.title}</Text>
                  </Center>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Set Poll Expiration Date</FormControl.Label>
                  <Input
                      onChangeText={() =>{}}
                  />
                </FormControl>
              </VStack>
              <Button mt="2" colorScheme="success" onPress={()=>{}}>
                Submit
              </Button>
            </Box>
          </Center>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
}

export default observer(FinalizeMoviePoll)
