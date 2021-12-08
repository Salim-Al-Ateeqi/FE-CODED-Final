import { observer } from "mobx-react";
import { Spinner } from "native-base";
import React from "react";
import { View, Text } from "react-native";
import imdbStore from "../../stores/imdbStore";
import MovieItem from "./MovieItem";

const MovieList = ({ navigation, group }) => {
  if (imdbStore.isLoading) return <Spinner />;
  console.log("list", group);

  console.log(imdbStore.data);
  const movieList = imdbStore.data.map((movie) => {
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
