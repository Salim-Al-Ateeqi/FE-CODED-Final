import { makeAutoObservable, runInAction } from "mobx";
const axios = require("axios").default;
import { apiKey } from "../utils/apiKey.js";

// REVIEW: WHY IMDB and not MovieStore?
class ImdbStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;
  // REVIEW: Why data not movies?
  data = null;

  fetchMovies = async (query) => {
    runInAction(() => {
      // REVIEW: Why is loading false then true then false?
      this.isLoading = true;
    });
    // REVIEW: 1. this is ugly, 2. use instance, 3. you can use instance.get and pass it params
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: query,
        api_key: apiKey,
        include_adult: false,
        page: 1,
        language: "en-US",
      },
    };
    try {
      const res = await axios.request(options);
      runInAction(() => {
        this.data = res.data.results;
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  clearSearchData = () => {
    this.data = null;
  };
}

const imdbStore = new ImdbStore();
export default imdbStore;
