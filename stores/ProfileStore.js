import { makeAutoObservable, runInAction } from "mobx";

// stores
import { instance } from "./instance";

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }

  profiles = [];
  isLoading = true;

  fetchProfiles = async () => {
    try {
      const res = await instance.get("/profiles");

      runInAction(() => {
        this.profiles = res.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.log("fetchProfile", error);
    }
  };

  updateProfile = async (profileId, updateInfo, toast) => {
    try {
      const formData = new FormData();
      for (const key in updateInfo) {
        formData.append(key, updateInfo[key]);
      }
      const res = await instance.put("/profiles", formData);

      runInAction(() => {
        this.profiles = this.profiles.map((_profile) =>
          _profile._id === profileId ? res.data : _profile
        );
      });

      toast.show({
        title: "Profile Updated",
        status: "success",
        placement: "top",
        duration: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Please Try Again.",
        status: "error",
        placement: "top",
      });
    }
  };

  pushNewUser = (userData) => {
    this.profiles.push({
      _id: this.user._id,
      phoneNumber: userData.phoneNumber,
      isValidated: false,
      profile: {
        name: "New User",
        image: "/media/defaultUserImage.jpg",
        groups: [],
      },
    });
  };

  getUserProfile = async () => {
    try {
      const res = await instance.get("/newprofile");
      this.profile.push(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  addGroupToProfile = (member, group) => {
    member.groups.push(group._id);
  };
}

const profileStore = new ProfileStore();
profileStore.fetchProfiles();
export default profileStore;
