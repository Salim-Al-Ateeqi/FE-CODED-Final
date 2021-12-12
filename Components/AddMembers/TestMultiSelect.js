// import React, { useState } from "react";
// // import { Text, View, Button } from "react-native";
// import SelectBox from "react-native-multi-selectbox";
// import { xorBy } from "lodash";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { ScrollView } from "react-native";

// import IntlPhoneInput from "react-native-intl-phone-input";
// import profileStore from "../../stores/ProfileStore";
// import ViewMembers from "../EditGroup/ViewMembers";
// import { Colors } from "../../utils/Colors";
// import {
//   Box,
//   Button,
//   FormControl,
//   Heading,
//   VStack,
//   useToast,
//   Center,
//   HStack,
//   Divider,
//   Text,
// } from "native-base";
// // const K_OPTIONS = [
// //   {
// //     item: "Juventus",
// //     id: "JUVE",
// //   },
// //   {
// //     item: "Real Madrid",
// //     id: "RM",
// //   },
// //   {
// //     item: "Barcelona",
// //     id: "BR",
// //   },
// //   {
// //     item: "PSG",
// //     id: "PSG",
// //   },
// // ];

// const K_OPTIONS = profileStore.profiles.map((profile) => {
//   let profilesList = {
//     id: `${profile._id}`,
//     item: `${profile.profile.name}`,
//   };
//   console.log("profile list:", profile);
//   return profilesList;
// });

// const TestMultiSelect = () => {
//   const [selectedTeams, setSelectedTeams] = useState([]);
//   return (
//     <KeyboardAwareScrollView>
//       <ScrollView>
//         <Center mt="10">
//           <Box safeArea p="2" py="2" w="100%" maxW="90%">
//             <VStack space={3} mt="5">
//               <SelectBox
//                 arrowIconColor={Colors.primary}
//                 searchIconColor={Colors.primary}
//                 toggleIconColor={Colors.primary}
//                 multiOptionContainerStyle={{
//                   backgroundColor: Colors.primary,
//                 }}
//                 label="New Members List:"
//                 options={K_OPTIONS}
//                 selectedValues={selectedTeams}
//                 onMultiSelect={onMultiChange()}
//                 onTapClose={onMultiChange()}
//                 isMulti
//               />
//             </VStack>
//             <Divider />
//             <VStack mb={5} p="5">
//               <Button
//                 mt="2"
//                 style={{ backgroundColor: Colors.primary }}
//                 // onPress={handleSubmit}
//               >
//                 Add Members
//               </Button>
//             </VStack>
//           </Box>
//         </Center>
//       </ScrollView>
//     </KeyboardAwareScrollView>
//   );

//   function onMultiChange() {
//     return (item) => setSelectedTeams(xorBy(selectedTeams, [item], "id"));
//   }
// };

// export default TestMultiSelect;

// <View style={{ margin: 30 }}>
//   <View style={{ height: 40 }} />
//   <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Members</Text>
//   <SelectBox
//     arrowIconColor={Colors.primary}
//     searchIconColor={Colors.primary}
//     toggleIconColor={Colors.primary}
//     multiOptionContainerStyle={{ backgroundColor: Colors.primary }}
//     label="New Members List:"
//     options={K_OPTIONS}
//     selectedValues={selectedTeams}
//     onMultiSelect={onMultiChange()}
//     onTapClose={onMultiChange()}
//     isMulti
//   />
//   <VStack mb={5}>
//     <Button
//       mt="2"
//       style={{ backgroundColor: Colors.primary }}
//       // onPress={handleSubmit}
//     >
//       Add Members
//     </Button>
//   </VStack>
// </View>
