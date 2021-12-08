import React from "react";
import {
  Menu,
  Box,
  Center,
  Pressable
} from "native-base";
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MenuIcon = ({ navigation, group }) => {
    
    return (
        <Center>
            <Menu w="190"
                trigger={(triggerProps) => {
                    return (
                        <Pressable style={{ marginRight: 15 }} accessibilityLabel="More options menu" {...triggerProps}>
                            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                        </Pressable>
                    )
                }}
            >
                <Box w="100%" px={4} justifyContent="center">
                    <Menu.Item onPress={() => navigation.navigate("MoviePoll", {group: group})}>
                        Create Movie Poll
                    </Menu.Item>
                    <Menu.Item  onPress={() => navigation.navigate("AddMembers")}>
                        AddMembers
                    </Menu.Item>
                    {/* Add page to return group member list */}
                    <Menu.Item >
                        View Members
                    </Menu.Item>
                    {/* Add Update Page for Group */}
                    <Menu.Item >
                        Update Group Details
                    </Menu.Item>
                    {/* Add Delete Handler and navigate */}
                    <Menu.Item >
                        Delete Group
                    </Menu.Item>
                </Box>
            </Menu>
        </Center>
    )
}

export default MenuIcon
