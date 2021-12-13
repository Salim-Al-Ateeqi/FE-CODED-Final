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
      const res = await instance.post("/groups", formData);
      runInAction(() => {
        this.groups.push(res.data);
      });
      socket.emit("new-group", res.data);
      toast.show({
        title: "Group Created",
        status: "success",
        placement: "top",
        duration: 1500,
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
        this.groups = this.groups.map((_group) =>
          _group._id === groupId ? res.data : _group
        );
      });

      toast.show({
        title: "Group UpDated!",
        status: "success",
        placement: "top",
        duration: 1500,
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

  deleteGroup = async (groupId, toast) => {
    try {
      await instance.delete(`/groups/${groupId}`);
      runInAction(() => {
        this.groups = this.groups.filter((group) => group._id !== groupId);
      });
      toast.show({
        title: "Group Deleted.",
        status: "success",
        placement: "top",
        duration: 1500,
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

  addMembersToGroup = async (phoneNumber, group, navigation, toast) => {
    try {
      const res = await instance.put(`/groups/${group._id}/members`, {
        phoneNumber: phoneNumber.phoneNumber,
      });
      runInAction(() => {
        group.members.push(res.data.members[res.data.members.length - 1]);
      });
      socket.emit("adding-new-member", res.data);
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
      const res = await instance.post(`/groups/${groupId}/chats`, newMessage);
      runInAction(() => {
        group.chat.push(res.data);
      });
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
      const res = await instance.post(`/groups/${groupId}/polls`, pollData);
      runInAction(() => {
        group.polls.push(res.data);
      });

      socket.emit("create-poll", res.data);
      toast.show({
        title: "Poll Created!",
        status: "success",
        placement: "top",
        duration: 1500,
      });
      navigation.navigate("GroupDetail", { group });
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
    try {
      let group = this.groups.find((group) => group._id === groupId);
      let poll = group.polls.find((poll) => poll._id === pollId);
      const res = await instance.put(`/polls/${pollId}/submitvote`, userVote);
      socket.emit("submit-poll-vote", res.data);
      poll.votes.push(res.data.votes[res.data.votes.length - 1]);
    } catch (error) {
      console.log(error);
    }
  };

  //Socket Function Below:

  receiveMessage = (payload) => {
    const group = this.groups.find((group) => group._id === payload._id);
    const chatexists = group.chat.find(
      (message) => message._id === payload.response._id
    );
    if (!chatexists) {
      runInAction(() => {
        group.chat.push(payload.response);
      });
    }
  };

  receiveGroup = (payload) => {
    const group = this.groups.find((group) => group._id === payload._id);
    if (!group) {
      runInAction(() => {
        this.groups.push(payload);
      });
    }
  };

  receiveUpdatedGroupMembers = (payload) => {
    const group = this.groups.find((group) => group._id === payload._id);
    const newestMember = payload.members[group.members.length - 1];
    runInAction(() => {
      group.members.push(newestMember);
    });
  };

  recievePoll = (data) => {
    const group = this.groups.find((group) => group._id === data.group);
    const pollexists = group.polls.find((poll) => poll._id === data._id);
    if (!pollexists) {
      runInAction(() => {
        group.polls.push(data);
      });
    }
  };

  revievePollVote = (data) => {
    const group = this.groups.find((group) => group._id === data.group);
    const poll = group.polls.find((poll) => data._id === poll._id);
    const voteExists = poll.votes.find((vote) => vote._id === data.votes._id);
    if (!voteExists) {
      poll.votes.push(data.votes[data.votes.length - 1]);
    }
  };
}

const groupStore = new GroupStore();
groupStore.fetchGroups();

export default groupStore;
