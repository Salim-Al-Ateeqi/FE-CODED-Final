import React from "react";
import { ScrollView, View, Spinner } from "native-base";
import groupStore from "../../stores/groupStore";
import GroupItem from "./GroupItem";
import { observer } from "mobx-react";

const Home = ({ navigation }) => {
  if (groupStore.isLoading) {
    return <Spinner />;
  }

  const groupList = groupStore.groups.map((group) => (
    <GroupItem navigation={navigation} group={group} key={group._id} />
  ));

  return (
    <View>
      <ScrollView>{groupList}</ScrollView>
    </View>
  );
};

export default observer(Home);
