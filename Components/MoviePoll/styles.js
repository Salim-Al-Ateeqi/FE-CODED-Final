import { StyleSheet } from "react-native";
import { Colors } from "../../utils/Colors";

const styles = StyleSheet.create({
  //Movie Item

  movieTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
  },

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

  //Movie Details

  descCategory: { fontWeight: "bold" },
  overview: {
    marginVertical: 5,
    // borderWidth: 3,
    borderColor: "#004282",
    padding: 5,
    borderRadius: 5,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    marginVertical: 5,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    marginVertical: 5,
  },
  detailPoster: {
    width: 250,
    height: 400,
    marginTop: 5,
    borderRadius: 5,
  },
});

export default styles;
