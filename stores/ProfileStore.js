import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";

import authStore from "./authStore";

class ProfileStore {
	constructor() {
		makeAutoObservable(this);
	}

	profiles = [];
	currentProfile = null;
	isLoading = true;

	fetchProfile = async () => {
		try {
			const res = await instance.get("/getprofiles");
			const foundUser = res.data.find(
				(profile) => profile._id === authStore.user._id
			);
			runInAction(() => {
				this.currentProfile = foundUser;
				this.isLoading = false;
			});
		} catch (error) {
			console.log("fetchProfile", error);
		}
	};

	// findProfile = (userId) => {
	// 	const foundUser = this.profiles.find((profile) => profile._id === userId);
	// 	runInAction(() => {
	// 		this.currentProfile = foundUser;
	// 	});
	// };
}

const profileStore = new ProfileStore();
profileStore.fetchProfile();
export default profileStore;
