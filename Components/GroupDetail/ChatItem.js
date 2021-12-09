import React from 'react'
import { View } from 'react-native'
import { baseURL } from '../../stores/baseURL'
import { Colors } from "../../utils/Colors"; 
// stores
import { observer } from 'mobx-react'
import authStore from '../../stores/authStore'
import profileStore from "../../stores/ProfileStore";

import { Avatar, HStack, Image, Center, Text} from 'native-base'

const ChatItem = ({ chatData }) => {

    const userProfile = profileStore.profiles.find(profile => profile._id === chatData.sentFrom);

    const color = authStore.user._id === chatData.sentFrom ? '#99CCFF' : Colors.Primary

    return (
        <HStack space={2} flex={1} m='4' >
            <Image
                size={10}
                borderRadius={100}
                source={{
                uri: baseURL+userProfile.profile.image,
                }}
            />
            <Center mx="2" bg={color} px={3} borderRadius={50}>
                <Text color="#fff">
                    {chatData.message}
                </Text>
            </Center>
        </HStack>
    )
}

export default observer(ChatItem)
