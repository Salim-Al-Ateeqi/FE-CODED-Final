import { makeAutoObservable, runInAction } from "mobx";
const axios = require("axios").default;

// api
import { apiKey } from "../utils/apiKey.js";

class MovieStore {
	constructor() {
		makeAutoObservable(this);
	}

	isLoading = true;
	movies = null;

	fetchMovies = async (query) => {
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
				this.movies = res.data.results;
				this.isLoading = false;
			});
		} catch (error) {
			console.log(error);
		}
	};

	clearSearchData = () => {
		this.movies = null;
	};
}

const movieStore = new MovieStore();
export default movieStore;
