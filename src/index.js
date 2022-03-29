import axios from "axios";

const API_URL = "https://api.github.com/orgs/stackbuilders/repos";

// Fetch data from the GitHub API.
const fetchData = async (api_url) => {
    try {
        const response = await axios.get(api_url, {
            headers:{
                'Authorization': "token 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"
            }
        });
        return response.data; 
    } catch (err) {
        console.error(err);
    }
    
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
export const getRepos = async (url_api) => {
    const reposArray = await getReposTR(url_api, 1, []);
    return reposArray.map(repo => ({
        name:repo.full_name.split("/")[1],
        url:repo.html_url,
        updated:repo.updated_at,
        stars:repo.stargazers_count
    }));
}

// Get more than five stars from the data retrieve before.
export const getMoreThanFiveStars = (repos) => {
    return repos.filter(repo => repo.stars > 5);
}

// Get the sum of all stars from the data retrieve before.
export const getSumOfStars = (repos) => {
    return repos.reduce((sum, repo) => sum + repo.stars, 0);
}

// Get the five last updated repos from the data retrieve before.
// The easiest way to do this is by sorting the repo by dates using sort and 
// the date class (the date class is powerful).
export const getFiveLastUpdated = (repos) => {
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



