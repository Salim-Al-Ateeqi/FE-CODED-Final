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
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: query,
        api_key: apiKey,
        include_adult: false,
        page: 1,
        language: "en-US"
      },
    };
    try {
      const res = await axios.request(options);
      // console.log('\n\n\n\n\n\nNEWLINE')
      runInAction(() => {
        this.data = res.data.results;
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const imdbStore = new ImdbStore();
export default imdbStore;
