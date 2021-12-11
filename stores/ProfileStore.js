import { makeAutoObservable, runInAction } from "mobx";

// stores
import { instance } from "./instance";

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }

  profiles = [];
  isLoading = true;

  // REVIEW: Isn't this fetching all profiles? If yes, then it should `fetchProfiles`.
  fetchProfile = async () => {
    try {
      const res = await instance.get("/getprofiles");

      runInAction(() => {
        this.profiles = res.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.log("fetchProfile", error);
    }
  };

  // REVIEW: If you're not gonna remove toast, remove it
  updateProfile = async (profileId, updateInfo, toast) => {
    try {
      const formData = new FormData();
      for (const key in updateInfo) {
        formData.append(key, updateInfo[key]);
      }
      const res = await instance.put("/updateprofile", formData);

      runInAction(() => {
        this.profiles = this.profiles.map((_profile) =>
          _profile._id === profileId ? res.data : _profile
        );
      });
    } catch (error) {
      console.log(error);
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

  addGroupToProfile = (member, group) => {
    member.groups.push(group._id);
  };
}

const profileStore = new ProfileStore();
profileStore.fetchProfile();
export default profileStore;
