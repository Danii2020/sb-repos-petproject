import { getRepos, getMoreThanFiveStars, getSumOfStars, getFiveLastUpdated } from "./src/index.js";
import {writeFileSync} from 'fs';

const API_URL = "https://api.github.com/orgs/stackbuilders/repos";

(async () => {
    // Retrieve and store all repos.
    const repos = await getRepos(API_URL);
    writeFileSync('./data/all_repos.json', JSON.stringify(repos));

    // Retrieve and store repos with more than five stars.
    const moreThanFiveRepos = getMoreThanFiveStars(repos);
    writeFileSync('./data/more_than_five_stars_repos.json', JSON.stringify(moreThanFiveRepos));
    
    // Retrieve and store the sum of stars in all repos.
    const sumOfStars = getSumOfStars(repos);
    writeFileSync('./data/sum_of_stars.txt', "The sum of stars is: " + String(sumOfStars));

    // Retrieve and store the last five updated repos.
    const fiveLastUpdatedRepos = getFiveLastUpdated(repos);
    writeFileSync('./data/five_last_updated_repos.json', JSON.stringify(fiveLastUpdatedRepos));

    // Show the results in console.
    console.log("Repos with more than five stars:\n");
    console.log(moreThanFiveRepos);

    console.log("Five last updated repos:\n");
    console.log(fiveLastUpdatedRepos);

    console.log("The sum of all stars in repos is:\n");
    console.log(sumOfStars);
})();