const axios = require("axios");

const API_URL = "https://api.github.com/orgs/stackbuilders/repos";

// Fetch data from the GitHub API.
const fetchData = async (api_url) => {
    const response = await axios.get(api_url, {
        headers:{
            'Authorization': "token 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"
        }
    });
    return response.data; 
}

// Get repos with Tail Recursion (I think).
const getReposTR = async (url_api, pageNumber, repoData) => {
    let parsePage = (pageNumber) => url_api + `?per_page=100&page=${pageNumber}`;
    let newUrl = parsePage(pageNumber);
    const fetchedRepos = await fetchData(newUrl);
    if (fetchedRepos.length === 0) return repoData;
    return getReposTR(url_api, pageNumber + 1, repoData.concat(fetchedRepos));
}

// Get repos by calling the tail recursive function above.
const getRepos = async (url_api) => {
    const reposArray = await getReposTR(url_api, 1, []);
    return reposArray.map(repo => ({
        name:repo.full_name.split("/")[1],
        url:repo.html_url,
        updated:repo.updated_at,
        stars:repo.stargazers_count
    }));
}

// Get more than five stars from the data retrieve before.
const getMoreThanFiveStars = (repos) => {
    return repos.filter(repo => repo.stars > 5);
}

// Get the sum of all stars from the data retrieve before.
const getSumOfStars = (repos) => {
    return repos.reduce((sum, repo) => sum + repo.stars, 0);
}

// Get the five last updated repos from the data retrieve before.
// The easiest way is by sorting the repo by dates using sort and 
// the date object (the date object is powerful).
const getFiveLastUpdated = (repos) => {
    return repos.sort((a, b) => {
        return new Date(b.updated) - new Date(a.updated);
    }).slice(0, 5);
}

// This call is for testing purposes.
(async () => {
    const repos = await getRepos(API_URL);
    console.log(getMoreThanFiveStars(repos));
    console.log(getSumOfStars(repos));
    console.log(getFiveLastUpdated(repos));
})();



