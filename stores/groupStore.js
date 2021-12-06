import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class GroupStore {
  groups = [];

  constructor() {
    makeAutoObservable(this);
  }

  isLoading = true;

  fetchGroups = async () => {
    try {
      const res = await instance.get("/groups");
      this.groups = res.data;
      console.log(this.groups);
      this.isLoading = false;
    } catch (error) {
      console.log("groupStore -> fetchGroups -> error", error);
    }
  };

  createGroup = async (group, navigation, toast) => {
    try {
      const formData = new FormData();
      for (const key in group) {
        formData.append(key, group[key]);
      }

      const res = await instance.post("/groups", formData);
      this.groups.push(res.data);
      toast.show({
        title: "Group UpDate!",
        status: "success",
        placement: "top",
      });
      navigation.navigate("GroupDetail", { group: res.data });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Something Went Wrong!",
        description: "You Broke Something",
        status: "error",
        placement: "top",
      });
    }
  };

  updateGroup = async (groupId, updatedGroup, navigation, toast) => {
    try {
      const group = this.groups.find((group) => group._id === groupId);

      const formData = new FormData();
      for (const key in updatedGroup) {
        formData.append(key, updatedGroup[key]);
      }
      const res = await instance.put(`/groups/${groupId}`, formData);

      for (const key in group) group[key] = res.data[key];

      toast.show({
        title: "Group UpDate!",
        status: "success",
        placement: "top",
      });
      navigation.navigate("GroupDetail", { group: group });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Something Went Wrong!",
        description: "You Broke Something",
        status: "error",
        placement: "top",
      });
    }
  };

  deleteGroup = async (groupId) => {
    try {
      await instance.delete(`/groups/${groupId}`);
      this.groups = this.groups.filter((group) => group._id !== groupId);
    } catch (error) {
      console.log(error);
    }
  };

  addMembersToGroup = async (groupId) => {
    try {
      const group = this.groups.find((group) => group._id === groupId);
      const res = await instance.put(`/groups/${groupId}/members`);
      for (const key in group) group[key] = res.data[key];
    } catch (error) {
      console.log(error);
    }
  };
}

const groupStore = new GroupStore();
groupStore.fetchGroups();

export default groupStore;
