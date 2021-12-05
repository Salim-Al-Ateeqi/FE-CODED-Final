import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	user = null;

	setUser = async (token) => {
		try {
			await AsyncStorage.setItem("myToken", token);
			this.user = decode(token);
			instance.defaults.headers.common.Authorization = `Bearer ${token}`;
		} catch (error) {
			console.log(error);
		}
	};

	register = async (userData, toast, navigation) => {
		try {
			const res = await instance.post("/register", userData);
			this.setUser(res.data.token);
			// navigation.replace("Tabs");
			toast.show({
				status: "success",
				title: `Welcome`,
			});
		} catch (error) {
			console.log("register error", error);
			toast.show({
				status: "error",
				title: "Invalid Login",
				description: "The username or password you entered is incorrect",
			});
		}
	};

	login = async (userData, navigation, toast) => {
		try {
			const res = await instance.post("/login", userData);
			this.setUser(res.data.token);
			toast.show({
				status: "success",
				title: `Welcome`,
			});
			// navigation.replace("Tabs");
		} catch (error) {
			console.log("login error", error);
			toast.show({
				status: "error",
				title: "Invalid Login",
				description: "The username or password you entered is incorrect",
			});
		}
	};

	logout = async () => {
		try {
			delete instance.defaults.headers.common.Authorization;
			await AsyncStorage.removeItem("myToken");
			runInAction(() => {
				this.user = null;
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
