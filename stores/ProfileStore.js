import { makeAutoObservable, runInAction } from "mobx";

// stores
import { instance } from "./instance";

class ProfileStore {
	constructor() {
		makeAutoObservable(this);
	}

	profiles = [];
	isLoading = true;

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

	updateProfile = async (profileId, updateInfo, toast) => {
		try {
			const formData = new FormData();
			for (const key in updateInfo) {
				formData.append(key, updateInfo[key]);
			}
			const res = await instance.put("/updateprofile", formData);

			const findProfile = this.profiles.find(
				(profile) => profile._id === profileId
			);
			runInAction(() => {
				findProfile = res.data;
			});
		} catch (error) {
			console.log(error);
		}
	};
}

const profileStore = new ProfileStore();
profileStore.fetchProfile();
export default profileStore;
