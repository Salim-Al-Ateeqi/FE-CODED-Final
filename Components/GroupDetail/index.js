import { observer } from "mobx-react";
import { Spinner } from "native-base";
import React from "react";
import { Text, View } from "react-native";
import groupStore from "../../stores/groupStore";

const GroupDetail = ({ route, navigation }) => {
  const { group } = route.params;

  if (groupStore.isLoading) {
    return <Spinner />;
  }

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
export default observer(GroupDetail);
