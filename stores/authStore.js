import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imdbStore from "./imdbStore";

class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	user = null;

	setUser = async (token) => {
		try {
			await AsyncStorage.setItem("myToken", token);
			runInAction(() => {
				this.user = decode(token);
			});

			instance.defaults.headers.common.Authorization = `Bearer ${token}`;
		} catch (error) {
			console.log(error);
		}
	};

	register = async (userData, toast, navigation) => {
		try {
			const res = await instance.post("/register", userData);

				await this.setUser(res.data.token);
			this.checkUserValidated(toast, navigation, true);
			toast.show({
				status: "success",
				title: `Account Created`,
				placement: "top",
			});
		} catch (error) {
			console.log("register error", error);
			toast.show({
				status: "error",
				title: "Invalid Login",
				placement: "top",
				description: "The username or password you entered is incorrect",
			});
		}
	};


	checkUserValidated = (toast, navigation, showToast = false) => {
		if (this.user.isValidated) {
			if (showToast) {
				toast.show({
					status: "success",
					placement: "top",
					title: `Account Verified!`,
				});
			}
			navigation.replace("Tabs");
		} else {
			toast.show({
				status: "error",
				title: "Invalid Token",
				placement: "top",
				description: "The token is incorrect",
			});
			navigation.replace("ValidateToken");
		}
	};


	validateToken = async (userData, toast, navigation) => {
		try {
			const res = await instance.post("/verifyTwilio", userData);
			await this.setUser(res.data.token);
			this.checkUserValidated(toast, navigation);
		} catch (error) {
			console.log("register error", error);
		}
	};

	login = async (userData, toast, navigation) => {
		try {
			const res = await instance.post("/login", userData);
			await this.setUser(res.data.token);
			this.checkUserValidated(toast, navigation, true);
		} catch (error) {
			console.log("login error", error);
			toast.show({
				status: "error",
				title: "Invalid Login",
				placement: "top",
				description: "The username or password you entered is incorrect",
			});
		}
	};

	logout = async (navigation, toast) => {
		try {
			delete instance.defaults.headers.common.Authorization;
			await AsyncStorage.removeItem("myToken");
			runInAction(() => {
				this.user = null;
			});
			navigation.navigate("Signup");
			toast.show({
				status: "success",
				title: "Logged out",
				placement: "top",
				description: "Hope to see you soon.",
			});
		} catch (error) {
			console.log("logout error", error);
		}
	};

	checkForToken = async () => {
		try {
			const token = await AsyncStorage.getItem("myToken");

			if (token) {
				const user = decode(token);

				const userExp = user.exp * 1000;
				if (userExp > Date.now()) {
					this.setUser(token);
				} else {
					this.logout();
				}
			}
		} catch (error) {
			console.log("CheckForToken error", error);
		}
	};
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
