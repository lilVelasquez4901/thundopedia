//These are your 'business rules,' the functions.
const Tank = require('../models/resource.model.js');
const mades = ["Light Tank", "Medium Tank", "Heavy Tank", "Tank Destroyer", "SPAA"]
const rankers = ['I', 'II', "III", "IV", "V", "VI", "VII", "VIII"]
const nations = ["Germany", "USSR", "UK", "Israel", "France", "USA", "Japan", "China", "Sweden", "Italy"]
const crewCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
//These should also satisfy the sorting and filtering challenge. And placed pagiante for the second challenge on the top so other functions may call it with ease of use.
function paginate(query, page, pageSize){
    return query.skip((page-1)*pageSize).limit(pageSize)
}
async function pickByMake(make, page, pageSize){
    const match = mades.find(n => n.toLowerCase() === make?.toLowerCase());
    if (!match){
        const err = new Error(`Invalid Make: ${make} is not a class.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return paginate(Tank.find({ make: match }), page, pageSize);
};
async function pickByRank(rank, page, pageSize){
    const match = rankers.find(n => n.toLowerCase() === rank?.toLowerCase());
    if(!match){
        const err = new Error(`Invalid Rank: ${rank} is not a valid Ground Vehicle Rank.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return paginate(Tank.find({ rank: match }), page, pageSize);
}
async function pickByCrew(crew, page, pageSize){
    const crewNum = Number(crew)
    if(!crewCount.includes(crewNum)){
        const err = new Error(`Invalid Crew: no tank in game has a crew count of ${crew}.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return paginate(Tank.find({ crew_number: crewNum }), page, pageSize);
}
async function pickByNation(country, page, pageSize){
    const match = nations.find(n => n.toLowerCase() === country?.toLowerCase());
    if(!match){
        const err = new Error(`Invalid Nation: ${country} is not a tech tree.`)
        err.status = 400;
        err.code = 'BAD_REQUEST';
        throw err;
    }
    return paginate(Tank.find({ nation: match }), page, pageSize);
}
async function filterByCars(car, page, pageSize){
    const carBool = car === 'true';
    return paginate(Tank.find({ isCar: carBool }), page, pageSize);
}
async function filterByCustom(custom, page, pageSize){
    const isCustom = custom === 'true';
    return paginate(Tank.find({ custom: isCustom }), page, pageSize);
}
async function filterByCreator(creator, page, pageSize){
    if(!creator){
        const err = new Error(`Invalid User: ${creator} has no records.`)
        err.status = 400;
        err.code = "BAD_REQUEST"
        throw err;
    }
    return paginate(Tank.find({creator}), page, pageSize);
}
//The black sheep, only so it cause use pagination without having a real reason to be here besides being too massive to deny pagination to.
async function getAllVehicles(page, pageSize){
    return paginate(Tank.find({}), page, pageSize)
}
module.exports = {pickByMake, pickByRank, pickByCrew, pickByNation, filterByCustom, filterByCars, filterByCreator, getAllVehicles}