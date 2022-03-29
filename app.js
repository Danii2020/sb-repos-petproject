import { getRepos, getMoreThanFiveStars, getSumOfStars, getFiveLastUpdated } from "./src/index.js";
const API_URL = "https://api.github.com/orgs/stackbuilders/repos";

(async () => {
    const repos = await getRepos(API_URL);
    console.log(getMoreThanFiveStars(repos));
    console.log(getSumOfStars(repos));
    console.log(getFiveLastUpdated(repos));
})();