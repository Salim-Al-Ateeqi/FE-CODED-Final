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
    const id = "id";
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

      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "Group Created",
          status: "success",
          placement: "top",
          duration: 1800,
          isClosable: false,
        });
      }

      navigation.navigate("Tabs");
    } catch (error) {
      console.log(error);

      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "Please Try Again.",
          status: "error",
          placement: "top",
          isClosable: false,
        });
      }
    }
  };

  updateGroup = async (groupId, updatedGroup, navigation, toast) => {
    const id = "id";
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
      socket.emit("edit-group", res.data);

      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "Group Updated!",
          status: "success",
          placement: "top",
          duration: 1800,
          isClosable: false,
        });
      }
    } catch (error) {
      console.log(error);

      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: "Please Try Again.",
          status: "error",
          placement: "top",
          isClosable: false,
        });
      }
    }
  };

  deleteGroup = async (groupId, toast) => {
    try {
      await instance.delete(`/groups/${groupId}`);
      runInAction(() => {
        this.groups = this.groups.filter((group) => group._id !== groupId);
      });
      socket.emit("delete-group", groupId);
      toast.show({
        title: "Group Deleted.",
        status: "success",
        placement: "top",
        duration: 1800,
        isClosable: false,
      });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Something Went Wrong!",
        description: "You Broke Something",
        status: "error",
        placement: "top",
        isClosable: false,
      });
    }
  };

  addMembersToGroup = async (memberId, group, navigation, toast) => {
    try {
      let payload = {
        members: memberId,
      };
      const res = await instance.put(`/groups/${group._id}/members`, payload);
      toast.show({
        title: "Member Added",
        status: "success",
        placement: "top",
        isClosable: false,
      });
      navigation.goBack();
      runInAction(() => {
        let newMembers = res.data.members.slice(payload.members.length * -1);
        newMembers.forEach((member) => {
          group.members.push(member);
        });
        const data = {
          newMembersList: newMembers,
          targetGroup: group._id,
        };
        socket.emit("adding-new-member", data);
      });
    } catch (error) {
      console.log(error);
      const id = "id";

      if (error.response.status === 401) {
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: "Unauthorized",
            description: "You can't add members. You are not the admin.",
            status: "warning",
            placement: "top",
            isClosable: false,
          });
        }
      } else if (error.response.status === 500) {
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: "Not Found",
            description: "The number you entered is not found.",
            status: "warning",
            placement: "top",
            isClosable: false,
          });
        }
      }
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
        duration: 1800,
        isClosable: false,
      });
      navigation.navigate("GroupDetail", { group });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Something Went Wrong!",
        description: "Something happened somewhere!",
        status: "error",
        placement: "top",
        isClosable: false,
      });
    }
  };

  submitVote = async (groupId, pollId, userVote) => {
    try {
      let group = this.groups.find((group) => group._id === groupId);
      let poll = group.polls.find((poll) => poll._id === pollId);
      const res = await instance.put(`/polls/${pollId}/submitvote`, userVote);
      poll.votes.push(res.data.votes[res.data.votes.length - 1]);
      poll.noVotes = res.data.noVotes;
      poll.yesVotes = res.data.yesVotes;
      socket.emit("submit-poll-vote", res.data);
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
    const group = this.groups.find(
      (group) => group._id === payload.targetGroup
    );

    // const newestMember = payload.members[group.members.length - 1];
    runInAction(() => {
      payload.newMembersList.forEach((member) => {
        const userExists = group.members.find((user) => user === member);
        if (!userExists) {
          group.members.push(member);
        }
      });
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

  receivePollVote = (data) => {
    const group = this.groups.find((group) => group._id === data.group);
    const poll = group.polls.find((poll) => data._id === poll._id);
    const voteExists = poll.votes.find((vote) => vote._id === data.votes._id);
    if (!voteExists) {
      runInAction(() => {
        for (const key in poll) poll[key] = data[key];
      });
    }
  };

  recieveEditedGroup = (data) => {
    const group = this.groups.find((group) => group._id === data._id);
    runInAction(() => {
      for (const key in group) group[key] = data[key];
    });
  };

  recieveDeletedGroup = (data) => {
    // const deletedGroup = this.groups.find((group) => group._id === data);
    runInAction(() => {
      this.groups = this.groups.filter((group) => group._id !== data);
    });
  };
}

const groupStore = new GroupStore();
groupStore.fetchGroups();

export default groupStore;
