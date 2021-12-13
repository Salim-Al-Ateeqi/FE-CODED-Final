import { makeAutoObservable, runInAction } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	user = null;
	message = null;
	isLoading = false;

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
			this.message = "You will receive an SMS message shortly!";
			this.checkUserValidated(toast, navigation, true);
			toast.show({
				status: "success",
				title: `Account Created`,
				placement: "top",
				duration: 1500,
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
					title: `Welcome`,
					duration: 1500,
				});
			}
			// this.message = null;
			navigation.navigate("Tabs");
		} else {
			toast.show({
				status: "error",
				title: "Invalid Token",
				placement: "top",
				description: "The token is incorrect",
			});
			navigation.navigate("ValidateToken");
		}
	};

	validateToken = async (userData, toast, navigation) => {
		try {
			const res = await instance.post("/verifyTwilio", userData);
			console.log("res Data", res.data);
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
				this.message = null;
			});
			navigation.navigate("Signup");
			this.isLoading = false;
			toast.show({
				status: "success",
				title: "Logged out",
				placement: "top",
				description: "Hope to see you soon.",
				duration: 1500,
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
				this.message =
					"An SMS message was sent containing your token! Please check for an SMS from Twilio!";
				const userExp = user.exp * 1000;
				if (userExp > Date.now()) {
					this.setUser(token);
					this.isLoading = true;
				} else {
					this.logout();
					this.isLoading = false;
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
