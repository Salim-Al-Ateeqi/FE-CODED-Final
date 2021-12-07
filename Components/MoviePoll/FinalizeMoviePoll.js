import React, { useState, useEffect } from "react";
import { View, Text, Platform } from 'react-native';
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
    Image,
    useToast,
} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import groupStore from "../../stores/groupStore";

const FinalizeMoviePoll = ({ route, navigation }) => {
  const { movie } = route.params;
  const { group } = route.params;


  const currentTime = Date.now();
  const toast = useToast();

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [pollData, setPollData] = useState({
    title: movie.title,
    image: `https://image.tmdb.org/t/p/w500`+movie.poster_path,
    expiration: new Date(currentTime)
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || pollData.expiration;
    setShow(Platform.OS === 'ios');
    setPollData({...pollData, expiration: currentDate});
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleSubmit = () => {
    groupStore.createPoll(group._id, pollData, navigation, toast );
  }

  return (
      <KeyboardAwareScrollView>
      <ScrollView>
        <Center>
          <Box safeArea p="1" w="100%" maxW="290">
            <VStack space={2} mt="2">
              <FormControl>
                <Center>
                  <Heading
                    size="lg"
                    fontWeight="600"
                    color="coolGray.800"
                    _dark={{
                      color: "warmGray.50",
                    }}
                  >
                    Selected Movie
                  </Heading>
                  <Text>{movie.title}</Text>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500`+movie.poster_path }}
                        alt={movie.title}
                        style={{ width: 250, height: 400, padding: 5, marginTop: 5 }}
                    />
                </Center>
              </FormControl>
              <FormControl>
                <FormControl.Label>Set Poll Expiration Date</FormControl.Label>
                <View>
                  <View>
                    <Button onPress={showDatepicker} title="Show date picker!" mt="2" >Set Date</Button>
                  </View>
                  <View>
                    <Button onPress={showTimepicker} title="Show time picker!" mt="2" >Set Time</Button>
                  </View>
                    <Center>
                      <Heading>
                        Add Expiration
                      </Heading>
                    </Center>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={pollData.expiration}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
              </View>
              </FormControl>
            </VStack>
            <Button mt="2" colorScheme="success" onPress={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Center>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

export default observer(FinalizeMoviePoll)
