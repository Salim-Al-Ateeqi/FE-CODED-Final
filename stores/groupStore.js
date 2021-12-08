import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import profileStore from "./ProfileStore";

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


  addMembersToGroup = async (member, group, navigation, toast) => {
    try {
      console.log("group in store:", member._id);
      // const group = this.groups.find((group) => group._id === groupId);
      const res = await instance.put(`/groups/${group._id}/members`);
      group.members.push(member._id);
      profileStore.addGroupToProfile(member, group);
      // for (const key in group) group[key] = res.data[key];
      toast.show({
        title: "Poll Created!",
        status: "success",
        placement: "top",
      });
    } catch (error) {
      console.log(error);
    }
  };


  sendChatToGroup = async (groupId, newMessage) => {
    try {
      console.log(groupId, newMessage)
      const group = this.groups.find((group) => group._id === groupId);
      const res = await instance.post(`/groups/${groupId}/addChat`);
      console.log(res.data)
      group.chat.push(res.data);
    } catch (error) {
      console.log(error)
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
}

const groupStore = new GroupStore();
groupStore.fetchGroups();

export default groupStore;
