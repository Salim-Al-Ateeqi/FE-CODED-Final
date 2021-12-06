import { observer } from 'mobx-react'
import { Spinner } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import imdbStore from '../stores/imdbStore'
import MovieItem from './MovieItem';

const MovieList = ({ setSelectedMovie }) => {

    if(imdbStore.isLoading) return <Spinner />

    const movieList = imdbStore.data.map(
        movie => {
            if (movie.q) {
                return <MovieItem key={movie.id} movie={movie} setSelectedMovie={setSelectedMovie} />
            }
        }
    )


    return (
        <View>
            { movieList }
        </View>
    )
}

export default observer(MovieList)
