import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Signin";
import Tabs from "../DrawerNavigation/Tabs";
import ValidateToken from "../Authentication/ValidateToken";
import CreateCustomPoll from "../CreateCustomPoll";
import MoviePoll from "../MoviePoll";
import FinalizeMoviePoll from "../MoviePoll/FinalizeMoviePoll";
import AddMembers from "../AddMembers";
import GroupDetail from "../GroupDetail";
import MenuIcon from "../GroupDetail/MenuIcon";
// stores
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";

const RootNavigator = () => {
  const { Navigator, Screen, Group } = createStackNavigator();
  return (
    <Navigator>
      {!authStore.user ? (
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
        </>
      ) : authStore.user.isValidated ? (
        <>
          <Screen
            name="Tabs"
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
          <Screen name="CreateCustomPoll" component={CreateCustomPoll} />
          <Screen name="MoviePoll" component={MoviePoll} />
          <Screen
            name="AddMembers"
            component={AddMembers}
            options={{
              headerShown: true,
            }}
          />
          <Screen
            name="GroupDetail"
            component={GroupDetail}
            options={({ route, navigation }) => {
              const { group } = route.params;
              return {
                headerTitle: group.name,
                //Having issue sending group object to moviepoll component
                headerRight: () => (
                  <MenuIcon navigation={navigation} group={group} />
                ),
              };
            }}
          />
          <Screen name="FinalizeMoviePoll" component={FinalizeMoviePoll} />
        </>
      ) : (
        <Screen
          name="ValidateToken"
          component={ValidateToken}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Navigator>
  );
};
export default observer(RootNavigator);
