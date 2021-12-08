import React from "react";
import { Text } from "react-native";
import { Image, Pressable, Center, Container, HStack, Box } from "native-base";
import styles from "./styles";
import { style } from "dom-helpers";

const MovieItem = ({ movie, navigation, group }) => {
  const handleSelect = () => {
    navigation.navigate("FinalizeMoviePoll", { movie: movie, group: group });
  };

  return (
    <Pressable onPress={handleSelect} mb="5">
      <HStack>
        <Box>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500` + movie.poster_path,
            }}
            alt={movie.title}
            style={styles.moviePoster}
          />
        </Box>
        <Box style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{movie.original_title}</Text>{" "}
          <Text style={styles.descCategory}>Rating: </Text>
          <Text>{movie.vote_average} ⭐</Text>{" "}
          <Text style={styles.descCategory}>Release Date:</Text>
          <Text>{movie.release_date}</Text>
        </Box>
      </HStack>
    </Pressable>
  );
};

export default MovieItem;
