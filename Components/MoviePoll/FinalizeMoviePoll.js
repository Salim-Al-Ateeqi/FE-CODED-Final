import React, { useState } from "react";
import { View, Text, Platform } from "react-native";
import { observer } from "mobx-react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import {
	Box,
	Button,
	FormControl,
	Heading,
	VStack,
	Center,
	Image,
	useToast,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import groupStore from "../../stores/groupStore";
import styles from "./styles";
import movieStore from "../../stores/movieStore";

const FinalizeMoviePoll = ({ route, navigation }) => {
	const { movie } = route.params;
	const { group } = route.params;

	const currentTime = Date.now();
	const toast = useToast();

	const [mode, setMode] = useState("date");
	const [show, setShow] = useState(false);
	const [pollData, setPollData] = useState({
		title: movie.title,
		image: `https://image.tmdb.org/t/p/w500` + movie.poster_path,
		expiration: new Date(currentTime),
	});

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || pollData.expiration;
		setShow(Platform.OS === "ios");
		setPollData({ ...pollData, expiration: currentDate });
	};

	const showMode = (currentMode, movie) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode("date");
	};

	const showTimepicker = () => {
		showMode("time");
	};

	const handleSubmit = () => {
		movieStore.clearSearchData();
		groupStore.createPoll(group._id, pollData, navigation, toast);
	};

	return (
		<KeyboardAwareScrollView>
			<ScrollView>
				<Center>
					<Box safeArea p="1" w="100%" maxW="290">
						<VStack space={2} mt="2">
							<FormControl>
								<Center>
									<Heading>{movie.title}</Heading>
									<Image
										source={{
											uri:
												`https://image.tmdb.org/t/p/w500` + movie.poster_path,
										}}
										alt={movie.title}
										style={styles.detailPoster}
									/>
								</Center>
							</FormControl>
							<Text style={styles.overview}>{movie.overview}</Text>
							<FormControl>
								<Text style={styles.descCategory}>
									Set Poll Expiration Date
								</Text>
								<View>
									<View>
										<Button
											onPress={showDatepicker}
											title="Show date picker!"
											style={styles.secondaryButton}
										>
											Set Date
										</Button>
									</View>
									<View>
										<Button
											onPress={showTimepicker}
											title="Show time picker!"
											style={styles.secondaryButton}
										>
											Set Time
										</Button>
									</View>
									<Text style={styles.descCategory}> Set Expiration Date</Text>
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
						<Button style={styles.primaryButton} onPress={handleSubmit}>
							Submit
						</Button>
					</Box>
				</Center>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
};

export default observer(FinalizeMoviePoll);
