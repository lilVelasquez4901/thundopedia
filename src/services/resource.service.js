//These are your 'business rules,' the functions.
const Tank = require('../models/resource.model.js');
const mades = ["Light Tank", "Medium Tank", "Heavy Tank", "Tank Destroyer", "SPAA"]
const rankers = ['I', 'II', "III", "IV", "V", "VI", "VII", "VIII"]
const nations = ["Germany", "USSR", "UK", "Israel", "France", "USA", "Japan", "China", "Sweden", "Italy"]
const crewCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

async function pickByMake(make){
    const match = mades.find(n => n.toLowerCase() === make?.toLowerCase());
    if (!match){
        const err = new Error(`Invalid Make: ${make} is not a class.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return Tank.find({make: match})
};
async function pickByRank(rank){
    const match = rankers.find(n => n.toLowerCase() === rank?.toLowerCase());
    if(!match){
        const err = new Error(`Invalid Rank: ${rank} is not a valid Ground Vehicle Rank.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return Tank.find({rank: match})
}
async function pickByCrew(crew){
    const crewNum = Number(crew)
    if(!crewCount.includes(crewNum)){
        const err = new Error(`Invalid Crew: no tank in game has a crew count of ${crew}.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return Tank.find({crew_number: crewNum})
}
async function pickByNation(country){
    const match = nations.find(n => n.toLowerCase() === country?.toLowerCase());
    if(!match){
        const err = new Error(`Invalid Nation: ${country} is not a tech tree.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return Tank.find({nation: match})
}
async function filterByCars(car){
    const carBool = car === 'true';
    return Tank.find({ isCar: carBool})
}
async function filterByCustom(custom){
    const isCustom = custom === 'true';
    return Tank.find({ custom: isCustom });
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