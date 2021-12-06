import React from 'react'
import { View, Text } from 'react-native';

import {
    Center,
    Image,
    Pressable
} from 'native-base';

const MovieItem = ({ movie, navigation, group }) => {

    const handleSelect = () => {
        navigation.navigate('FinalizeMoviePoll', { movie: movie })
    }

    return (
        <Pressable onPress={handleSelect}>
            
                <Center >
                    <Image
                        source={{ uri: movie.i.imageUrl }}
                        alt={movie.l}
                        style={{ width: 150, height: 200, padding: 5 }}
                    />
                    <Text>{movie.l}</Text>
                </Center >
        </Pressable>
    )
}

export default MovieItem
