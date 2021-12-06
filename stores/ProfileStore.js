import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";

import authStore from "./authStore";

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
}

const profileStore = new ProfileStore();
profileStore.fetchProfile();
export default profileStore;
