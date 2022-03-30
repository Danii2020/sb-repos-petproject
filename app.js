import { getRepos, getMoreThanFiveStars, getSumOfStars, getFiveLastUpdated } from "./src/index.js";
import {writeFileSync} from 'fs';

const API_URL = "https://api.github.com/orgs/stackbuilders/repos";

(async () => {
    // Retrieve all repos.
    const repos = await getRepos(API_URL);
    writeFileSync('./data/all_repos.json', JSON.stringify(repos));

    const moreThanFiveRepos = getMoreThanFiveStars(repos);
    writeFileSync('./data/more_than_five_stars_repos.json', JSON.stringify(moreThanFiveRepos));
    
    const sumOfStars = getSumOfStars(repos);
    writeFileSync('./data/sum_of_stars.txt', "The sum of stars is: " + String(sumOfStars));

    const fiveLastUpdatedRepos = getFiveLastUpdated(repos);
    writeFileSync('./data/five_last_updated_repos.json', JSON.stringify(fiveLastUpdatedRepos));
})();