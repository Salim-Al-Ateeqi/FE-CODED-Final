import { StyleSheet } from "react-native";
import { Colors } from "../../assets/Theme/Colors";

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    opacity: 50,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    borderRadius: 10,
  },
  image: {
    height: 200,
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    width: 150,
    color: Colors.lightBg,
  },
  by: {
    textAlign: "center",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    color: Colors.lightBg,
  },
  button: {
    marginTop: 10,
    width: 70,
    marginHorizontal: 5,
    backgroundColor: Colors.secondary,
  },
  pollButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    marginBottom: 15,
  },
  voteCount: {
    marginTop: 10,
    borderRadius: 50,
    height: 25,
    width: 50,
    marginHorizontal: 5,

    backgroundColor: Colors.yellow,
  },
  center: { marginLeft: "auto", marginRight: "auto" },
});

export default styles;
