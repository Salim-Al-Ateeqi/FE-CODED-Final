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
                        source={{ uri: `https://image.tmdb.org/t/p/w500`+movie.poster_path }}
                        alt={movie.title}
                        style={{ width: 150, height: 200, padding: 5 }}
                    />
                    <Text>{movie.original_title}</Text>
                </Center >
        </Pressable>
    )
}

export default MovieItem
