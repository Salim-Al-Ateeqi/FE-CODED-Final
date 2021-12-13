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

const Drawer = createDrawerNavigator();

const Tabs = () => {
  return (
    <Box flex={1}>
      <Drawer.Navigator
        initialRouteName={Home}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Groups" component={Home} />
        <Drawer.Screen name="Account" component={Profile} />
        <Drawer.Screen name="About Us" component={AboutUs} />
        <Drawer.Screen name="Feedback" component={HelpAndFeedback} />
      </Drawer.Navigator>
    </Box>
  );
};

export default observer(Tabs);
