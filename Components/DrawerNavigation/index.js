import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Box } from "native-base";
import { observer } from "mobx-react";

// components
import CustomDrawerContent from "./CustomDrawerContent";

// screens
import Home from "../Home/index";
import Profile from "../Profile";
import AboutUs from "../AboutUs";
import HelpAndFeedback from "../HelpAndFeedback";
import { Colors } from "../../assets/Theme/Colors";

const Drawer = createDrawerNavigator();

const Tabs = () => {
  return (
    <Box flex={1}>
      <Drawer.Navigator
        initialRouteName={Home}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Groups"
          component={Home}
          options={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "white",
          }}
        />
        <Drawer.Screen
          name="Account"
          component={Profile}
          options={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "white",
          }}
        />
        <Drawer.Screen
          name="About Us"
          component={AboutUs}
          options={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "white",
          }}
        />
        <Drawer.Screen
          name="Feedback"
          component={HelpAndFeedback}
          options={{
            headerStyle: { backgroundColor: Colors.primary },
            headerTintColor: "white",
          }}
        />
      </Drawer.Navigator>
    </Box>
  );
};

export default observer(Tabs);
