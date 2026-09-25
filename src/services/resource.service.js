//These are your 'business rules,' the functions.
const Tank = require('../models/resource.model.js');
const mades = ["Light Tank", "Medium Tank", "Heavy Tank", "Tank Destroyer", "SPAA"]
const rankers = ['I', 'II', "III", "IV", "V", "VI", "VII", "VIII"]
const nations = ["Germany", "USSR", "UK", "Israel", "France", "USA", "Japan", "China", "Sweden", "Italy"]
const crewCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

async function pickByMake(make){
    if (!mades.includes(make)){
        const err = new Error(`Invalid Make: ${make} is not a class.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return Tank.find({make})
};
async function pickByRank(rank){
    if(!rankers.includes(rank)){
        const err = new Error(`Invalid Rank: ${rank} is not a valid Ground Vehicle Rank.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return Tank.find({rank})
}
async function pickByCrew(crew){
    if(!crewCount.includes(crew)){
        const err = new Error(`Invalid Crew: no tank in game has a crew count of ${crew}.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return Tank.find({crew_number: crew})
}
async function pickByNation(country){
    if(!nations.includes(country)){
        const err = new Error(`Invalid Nation: ${country} is not a tech tree.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return Tank.find({nation: country})
}
async function filterByCars(car){
    if(!car){
        return Tank.find({isCar: false})
    }
    return Tank.find({car})
}
async function filterByCustom(custom){
    if(!custom){
        return Tank.find({custom: false})
    }
    return Tank.find({custom})
}
async function filterByCreator(creator){
    if(!creator){
        const err = new Error(`Invalid User: ${creator} has no records.`)
        err.status = 400;
        err.code = "BAD_REQUEST"
        throw err;
    }
    return Tank.find({creator})
}
module.exports = {pickByMake, pickByRank, pickByCrew, pickByNation, filterByCustom, filterByCars, filterByCreator}