import { StyleSheet } from "react-native";
import { Colors } from "../../assets/Theme/Colors";

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkBg,
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
  },
  by: {
    textAlign: "center",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: "auto",
    width: 70,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});

export default styles;
