import React from "react";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { Box } from "native-base";
import { observer } from "mobx-react";

// components
import CustomDrawerContent from "./CustomDrawerContent";

// screens
import Home from "../Home/index";
import Profile from "../Profile/Profile";

const Drawer = createDrawerNavigator();
// REVIEW: Remove unused imports and props
const Tabs = ({ navigation }) => {
  return (
    <Box flex={1}>
      <Drawer.Navigator
        initialRouteName={Home}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Groups" component={Home} />
        <Drawer.Screen name="Edit Profile" component={Profile} />
      </Drawer.Navigator>
    </Box>
  );
};

export default observer(Tabs);
