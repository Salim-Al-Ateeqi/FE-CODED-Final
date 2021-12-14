import { makeAutoObservable, runInAction } from "mobx";

// stores
import { instance, socket } from "./instance";

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
		const id = "id";
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
			socket.emit("update-profile", res.data);

			if (!toast.isActive(id)) {
				toast.show({
					id,
					title: "Profile Updated",
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
			socket.emit("pushNewUserProfile", res.data);
			runInAction(() => {
				this.profiles.push(res.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	recieveNewUserProfile = (data) => {
		const profile = this.profiles.find((profile) => profile._id === data._id);

		if (!profile) {
			runInAction(() => {
				this.profiles.push(data);
			});
		}
	};

	recieveUpdatedProfile = (data) => {
		const profile = this.profiles.find((profile) => profile._id === data._id);
		runInAction(() => {
			for (const key in profile) profile[key] = data[key];
		});
	};
}

const profileStore = new ProfileStore();
profileStore.fetchProfiles();
export default profileStore;
