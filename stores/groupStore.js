import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";
import { socket } from "./instance";

class GroupStore {
  groups = [];
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchGroups = async () => {
    try {
      const res = await instance.get("/groups");
      this.groups = res.data;
      this.isLoading = false;
    } catch (error) {
      console.log("groupStore -> fetchGroups -> error", error);
    }
  };

  createGroup = async (group, toast, navigation) => {
    try {
      const formData = new FormData();
      for (const key in group) {
        formData.append(key, group[key]);
      }
      // REVIEW: Remove console log if done from it
      console.log("Hello");
      const res = await instance.post("/groups", formData);
      this.groups.push(res.data);
      toast.show({
        title: "Group Created",
        status: "success",
        placement: "top",
      });
      navigation.goBack();
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

      runInAction(() => {
        // REVIEW: Why this? just overwrite group with res.data
        for (const key in group) group[key] = res.data[key];
      });

      toast.show({
        title: "Group UpDated!",
        status: "success",
        placement: "top",
      });
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

  addMembersToGroup = async (phoneNumber, group, navigation, toast) => {
    try {
      const res = await instance.put(`/groups/${group._id}/members`, {
        phoneNumber: phoneNumber.phoneNumber,
      });
      runInAction(() => {
        group.members.push(res.data.members[res.data.members.length - 1]);
      });
      toast.show({
        title: "Member Added!",
        status: "success",
        placement: "top",
      });
    } catch (error) {
      console.log(error);
    }
  };

  sendChatToGroup = async (groupId, newMessage) => {
    try {
      const group = this.groups.find((group) => group._id === groupId);
      const res = await instance.post(`/groups/${groupId}/addChat`, newMessage);
      group.chat.push(res.data);
      const payload = {
        _id: groupId,
        response: res.data,
      };
      socket.emit("group-message", payload);
    } catch (error) {
      console.log(error);
    }
  };

  createPoll = async (groupId, pollData, navigation, toast) => {
    try {
      const group = this.groups.find((group) => group._id === groupId);
      const res = await instance.post(
        `/groups/${groupId}/createmoviepoll`,
        pollData
      );
      group.polls.push(res.data);
      toast.show({
        title: "Poll Created!",
        status: "success",
        placement: "top",
      });
      navigation.navigate("GroupDetail", { group: group });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Something Went Wrong!",
        description: "Something happened somewhere!",
        status: "error",
        placement: "top",
      });
    }
  };

  submitVote = async (groupId, pollId, userVote) => {
    const group = this.groups.find((group) => group._id === groupId);
    const poll = group.polls.find((poll) => poll._id === pollId);
    // REVIEW: Where is the try-catch? :)))))))
    const res = await instance.put(`/polls/${pollId}/submitvote`, userVote);
    // REVIEW: Remove console log
    console.log(res.data);
    poll = res.data;
  };

  receiveMessage = (payload) => {
    console.log("recieved message in store");
    const group = this.groups.find((group) => group._id === payload._id);
    group.chat.push(payload.response);
  };
}

const groupStore = new GroupStore();
groupStore.fetchGroups();

export default groupStore;
