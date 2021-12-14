// import React, { useState } from "react";
// import {
// 	Box,
// 	Button,
// 	FormControl,
// 	Heading,
// 	VStack,
// 	useToast,
// 	Center,
// } from "native-base";
// import { ScrollView } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import IntlPhoneInput from "react-native-intl-phone-input";

// // components
// import { Colors } from "../../assets/Theme/Colors";

// // stores
// import groupStore from "../../stores/groupStore";

// const AddMembers = ({ navigation, route }) => {
// 	const { group } = route.params;
// 	const [phoneNumber, setPhoneNumber] = useState({
// 		phoneNumber: "",
// 	});

// 	const toast = useToast();

// 	const handleNumber = ({
// 		dialCode,
// 		unmaskedPhoneNumber,
// 		phoneNumber,
// 		isVerified,
// 	}) => {
// 		const userNumber = phoneNumber.replace(" ", "");
// 		const newNumber = `${dialCode}${userNumber}`;
// 		setPhoneNumber({ ...phoneNumber, phoneNumber: newNumber.replace("-", "") });
// 	};

// 	const handleSubmit = () => {
// 		groupStore.addMembersToGroup(phoneNumber, group, navigation, toast);
// 	};
// 	return (
// 		<KeyboardAwareScrollView>
// 			<ScrollView>
// 				<Center mt="20">
// 					<Box safeArea p="2" py="8" w="100%" maxW="290">
// 						<Heading
// 							size="lg"
// 							fontWeight="600"
// 							color="coolGray.800"
// 							_dark={{
// 								color: "warmGray.50",
// 							}}
// 						>
// 							Add Members
// 						</Heading>

// 						<VStack space={3} mt="5">
// 							<FormControl>
// 								<FormControl.Label>Phone Number</FormControl.Label>
// 								<IntlPhoneInput
// 									containerStyle={{
// 										borderColor: "#d4d4d4",
// 										borderWidth: 0.5,
// 										height: 50,
// 										borderBottomColor: "#D1D3D4",
// 										borderRadius: 5,
// 									}}
// 									flagStyle={{ fontSize: 25 }}
// 									phoneInputStyle={{
// 										lineHeight: 18,
// 										// if english or arabic
// 										// textAlign: i18nStore.language === "en" ? "left" : "right",
// 									}}
// 									onChangeText={handleNumber}
// 									defaultCountry="KW"
// 									modalCountryItemCountryNameStyle={{
// 										fontSize: 15,
// 									}}
// 								/>
// 							</FormControl>

// 							<Button
// 								mt="2"
// 								style={{ backgroundColor: Colors.primary }}
// 								onPress={handleSubmit}
// 							>
// 								Add Member
// 							</Button>
// 						</VStack>
// 					</Box>
// 				</Center>
// 			</ScrollView>
// 		</KeyboardAwareScrollView>
// 	);
// };

// export default AddMembers;
