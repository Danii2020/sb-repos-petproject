import {getMoreThanFiveStars, getSumOfStars, getFiveLastUpdated } from "../src/index.js";
import {readFileSync} from "fs";
import assert from "assert";

const allRepos = JSON.parse(readFileSync("./data/all_repos.json"));

describe("getMoreThanFiveStars", () => {
    context("when a repos object is taken as parameter", () => {
        it("returns repos with more than five stars", () => {
            const moreThanFiveRepos = getMoreThanFiveStars(allRepos);
            const checkFiveStars = (repos) => repos.every(repo => repo.stars > 5);
            assert.equal(checkFiveStars(moreThanFiveRepos), true);
        });
    });
    
});

describe("getSumOfStars", () => {
    context("when a repos object is taken as parameter", () => {
        it ("returns the sum of all stars in repos", () => {
            assert.equal(getSumOfStars(allRepos), 592);
        });
    });
    
});


describe("getFiveLastUpdated", () => {
    context("when a repos object is taken as parameter", () => {
        it ("return the last five updated repos", () => {
            const fiveUpdatedRepos = getFiveLastUpdated(allRepos);
            const checkOrder = (repos) => repos.every((a,i) => {
                return i === 0 || (new Date(a.updated)) <= (new Date(repos[i - 1].updated));
            });
            assert.equal(checkOrder(fiveUpdatedRepos), true);
        });
    });
});

