import React from "react";
import { observer } from "mobx-react";
import { createStackNavigator } from "@react-navigation/stack";
import io from "socket.io-client";

// Components
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Signin";
import Tabs from "../DrawerNavigation/";
import ValidateToken from "../Authentication/ValidateToken";
import CreateCustomPoll from "../CreateCustomPoll";
import MoviePoll from "../MoviePoll";
import FinalizeMoviePoll from "../MoviePoll/FinalizeMoviePoll";
import AddMembers from "../AddMembers";
import EditGroup from "../EditGroup";
import GroupDetail from "../GroupDetail";
import MenuIcon from "../GroupDetail/MenuIcon";
import GroupLeftImage from "../GroupDetail/GroupLeftImage";
import CreateGroup from "../CreateGroup";

// Stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/ProfileStore";
import groupStore from "../../stores/groupStore";
import { socket } from "../../stores/instance";

const RootNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();

  // SOCKETS
  // Recieve new message: new messages are displayed too all memebers in a group
  socket.on("new-message", (payload) => {
    groupStore.receiveMessage(payload);
  });

  // Recieve group
  socket.on("group-list-update", (payload) => {
    groupStore.receiveGroup(payload);
  });

  // Recieve new members: when you add a member, that group is displayed
  socket.on("receive-new-member", (payload) => {
    groupStore.receiveUpdatedGroupMembers(payload);
  });

  // Recieve new poll: when poll is created all members in a group can see it
  socket.on("recieve-poll", (data) => {
    groupStore.recievePoll(data);
  });

  // Recieve new poll vote: members of a group chat will see the votes on a poll
  socket.on("receive-poll-vote", (data) => {
    groupStore.receivePollVote(data);
  });

  // Recieve updated profile: User can
  socket.on("recieve-updated-profile", (data) => {
    profileStore.recieveUpdatedProfile(data);
  });

  return (
    <Navigator>
      {!authStore.user || !authStore.user.isValidated ? (
        <>
          <Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="Signin"
            component={Signin}
            options={{
              headerShown: false,
            }}
          />

          <Screen
            name="ValidateToken"
            component={ValidateToken}
            options={{
              headerShown: true,
            }}
          />
        </>
      ) : (
        <>
          <Screen
            name="Tabs"
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
          <Screen name="CreateCustomPoll" component={CreateCustomPoll} />
          <Screen
            name="AddMembers"
            component={AddMembers}
            options={{
              headerShown: true,
              headerTitle: "Add Members",
            }}
          />
          {/* // Note : Merge Conflict! Confirm Updated version:
//           <Screen
//             name="EditGroup"
//             component={EditGroup}
//             options={({ route, navigation }) => {
//               const { group } = route.params;
//               return {
//                 headerTitle: `${group.name} info`,
//               };
//             }}
//           /> */}
          <Screen
            name="EditGroup"
            component={EditGroup}
            options={({ route, navigation }) => {
              const { group } = route.params;
              const foundGroup = groupStore.groups.find(
                (_group) => _group._id === group._id
              );

              return {
                headerTitle: `Group info`,
              };
            }}
          />
          <Screen
            name="MoviePoll"
            component={MoviePoll}
            options={{
              headerShown: true,
              headerTitle: "Movie Poll",
            }}
          />
          {/* // Note  Merge Conflict! Confirm Updated version
//           <Screen
//             name="GroupDetail"
//             component={GroupDetail}
//             options={({ route, navigation }) => {
//               const { group } = route.params;
//               return {
//                 headerTitle: () => (
//                   <GroupLeftImage navigation={navigation} group={group} />
//                 ),
//                 headerRight: () => (
//                   <MenuIcon navigation={navigation} group={group} />
//                 ),
//               };
//             }}
//           /> */}
          <Screen
            name="GroupDetail"
            component={GroupDetail}
            options={({ route, navigation }) => {
              const { group } = route.params;
              const foundGroup = groupStore.groups.find(
                (_group) => _group._id === group._id
              );
              return {
                headerTitle: () => (
                  <GroupLeftImage navigation={navigation} group={foundGroup} />
                ),
                headerRight: () => (
                  <MenuIcon navigation={navigation} group={foundGroup} />
                ),
              };
            }}
          />
          <Screen
            name="CreateGroup"
            component={CreateGroup}
            options={{
              headerTitle: "Create Group",
            }}
          />
          <Screen name="FinalizeMoviePoll" component={FinalizeMoviePoll} />
        </>
      )}
    </Navigator>
  );
};
export default observer(RootNavigator);
