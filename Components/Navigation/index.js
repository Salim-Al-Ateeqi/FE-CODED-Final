import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// components
import Signup from "../Authentication/Signup";
import Signin from "../Authentication/Signin";
import ValidateToken from "../Authentication/ValidateToken";
import Tabs from "../DrawerNavigation/Tabs";
import AddMembers from "../AddMembers";

const RootNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator initialRouteName="AddMembers">
      <Screen name="Home" component={Home} />
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
          headerShown: false,
        }}
      />
      <Screen
        name="AddMembers"
        component={AddMembers}
        options={{
          headerShown: false,
        }}
      />
<Screen
				name="Tabs"
				component={Tabs}
				options={{
					headerShown: false,
				}}
			/>
    </Navigator>
  );
};

export default RootNavigator;
