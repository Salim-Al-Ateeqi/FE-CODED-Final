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
import imdbStore from "../stores/imdbStore";
import MovieList from "./MovieList";

const index = ({ navigation, group }) => {

  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    imdbStore.fetchMovies(query);
    setQuery('');
  };

  return (
      <KeyboardAwareScrollView>
        <ScrollView>
          <Center>
            <Box safeArea p="1" w="100%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                Find A Movie
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Search By Title</FormControl.Label>
                  <Input
                      value={query}
                      onChangeText={(query) =>setQuery(query)}
                  />
                </FormControl>
              </VStack>
              <Button mt="2" colorScheme="success" onPress={handleSubmit}>
                Find
              </Button>
              <VStack w='100%' mt='1' >
                {
                  imdbStore.data && <MovieList
                    navigation={navigation}
                    group={ group }
                  />
                }
              </VStack>
            </Box>
          </Center>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
};
    
export default observer(index);
