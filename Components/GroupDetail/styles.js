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
  buttonYes: {
    marginTop: 10,
    width: 70,
    marginHorizontal: 5,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonNo: {
    marginTop: 10,
    width: 70,
    marginHorizontal: 5,
    backgroundColor: Colors.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  pollButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    marginTop: 5,
    marginBottom: 5,
  },
  voteCountYes: {
    marginTop: 10,
    height: 25,
    width: 70,
    marginHorizontal: 5,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  voteCountNo: {
    marginTop: 10,
    height: 25,
    width: 70,
    marginHorizontal: 5,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  color: { color: "white" },
  center: { marginLeft: "auto", marginRight: "auto" },
});

export default styles;
