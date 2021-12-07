import React from 'react'
import { View, Text } from 'react-native';

import {
    Center,
    Image,
    Pressable,
    VStack,
    Stack,
    Divider,
} from 'native-base';

const MovieItem = ({ movie, navigation, group }) => {

    const handleSelect = () => {
        navigation.navigate('FinalizeMoviePoll', { movie: movie, group: group })
    }
    
    return (
        <Pressable onPress={handleSelect} mb='5'>
            <VStack direction="row" mb="2.5" mt="1.5" space={3}>
                <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500`+movie.poster_path }}
                        alt={movie.title}
                        style={{ width: 150, height: 200, padding: 1 }}
                    />
                    <Stack>
                        <Text>{movie.original_title}</Text>
                    </Stack>
                </Stack>
            </VStack>
        </Pressable>
    )
}

export default MovieItem
