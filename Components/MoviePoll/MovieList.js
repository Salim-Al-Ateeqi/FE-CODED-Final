import React from "react";
import { observer } from "mobx-react";
import { Spinner } from "native-base";
import { View } from "react-native";

// components
import MovieItem from "./MovieItem";

// stores
import movieStore from "../../stores/movieStore";

const MovieList = ({ navigation, group }) => {
	if (movieStore.isLoading) return <Spinner />;

	const movieList = movieStore.movies.map((movie) => {
		if (movie.title && movie.poster_path) {
			return (
				<MovieItem
					key={movie.id}
					movie={movie}
					navigation={navigation}
					group={group}
				/>
			);
		}
	});

	return <View>{movieList}</View>;
};

export default observer(MovieList);
