import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  movieTitle: { fontWeight: "bold", fontSize: 20, marginTop: 5 },

  moviePoster: {
    width: 150,
    height: 200,
    padding: 1,
    borderRadius: 5,
  },
  movieInfo: {
    width: 200,
    marginHorizontal: 10,
  },
  descCategory: { fontWeight: "bold" },
  overview: { marginVertical: 5 },
});

export default styles;
