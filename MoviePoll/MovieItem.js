import React from 'react'
import { View, Text } from 'react-native';

import {
    VStack,
    Center,
    Image,
    Pressable
} from 'native-base';

const MovieItem = ({ movie, setSelectedMovie }) => {

    const handleSelect = () => {
        console.log({ title: movie.l, image: movie.i.imageUrl })
        setSelectedMovie({ title: movie.l, image: movie.i.imageUrl })
    }

    return (
        <Pressable onPress={handleSelect}>
            <VStack w='100%' m='2'>
                <Center >
                    <Image source={{uri: movie.i.imageUrl} } alt={movie.l} style={{width: 150, height: 200, padding: 5}} />
                    <Text>{movie.l}</Text>
                </Center >
            </VStack>
        </Pressable>
    )
}

export default MovieItem
