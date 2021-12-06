import React from "react";
import {
  Container,
  ScrollView,
  View,
  Center,
  Button,
  Pressable,
  Image,
} from "native-base";
import styles from "./styles";
import groupStore from "../../stores/groupStore";

const Home = ({ navigation }) => {
  const groupList = groupStore.map((group) => (
    <Pressable
      onPress={() => navigation.navigate("GroupDetail", { group: group })}
    >
      <Image
        style={styles.image}
        source={{ uri: baseUrl + trip.image }}
        alt={trip.title}
      />
    </Pressable>
  ));

  return (
    <View style={styles.background}>
      <Button size="sm" variant="outline" colorScheme="success">
        Create Group
      </Button>
      <Center>
        <Container>
          <ScrollView>{groupList}</ScrollView>
        </Container>
      </Center>
    </View>
  );
};

export default Home;
