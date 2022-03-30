import {getMoreThanFiveStars, getSumOfStars, getFiveLastUpdated } from "../src/index.js";
import {readFileSync} from "fs";
import assert from "assert";

const allRepos = JSON.parse(readFileSync("./data/all_repos.json"));

describe("getMoreThanFiveStars", () => {
    it("returns the repos with more than five stars", () => {
        const moreThanFiveRepos = getMoreThanFiveStars(allRepos);
        const checkFiveStars = (reposData) => reposData.every(repo => repo.stars > 5);
        assert.equal(checkFiveStars(moreThanFiveRepos), true);
    });
});

describe("getSumOfStars", () => {
    it ("returns the sum of all stars in the repos", () => {
        assert.equal(getSumOfStars(allRepos), 592);
    });
});

