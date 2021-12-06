import { makeAutoObservable, runInAction } from "mobx";
const axios = require("axios").default;
import { apiKey } from "../utils/apiKey.js";

class ImdbStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;
  data = null;

  fetchMovies = async (query) => {
    runInAction(() => {
      this.isLoading = true;
    });

    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/auto-complete",
      params: { q: query },
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };

    try {
      const res = await axios.request(options);
      // console.log(res.data.d);
      runInAction(() => {
        this.data = res.data.d;
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const imdbStore = new ImdbStore();
export default imdbStore;
