//This is a scratched idea... store was going to be used for something else like user to user chat

// import { makeAutoObservable } from "mobx";
// import { instance } from "./instance";

// class UserStore {
//   users = [];

//   constructor() {
//     makeAutoObservable(this);
//   }

//   isLoading = true;

//   fetchUsers = async () => {
//     try {
//       const res = await instance.get("/getprofiles");
//       this.users = res.data;
//       this.isLoading = false;
//     } catch (error) {
//       console.log("userStore -> fetchUsers -> error", error);
//     }
//   };
// }

// const userStore = new UserStore();
// userStore.fetchUsers();

// export default userStore;
