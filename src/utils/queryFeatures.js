'use strict'
const {PAGINATION, SORTABLE_FIELDS, DEFAULT_SORT, NATIONS, RANKS, MAKES, CREW_COUNT} = require('../config/constants')
const ApiError = require('./ApiError')
//Opted to utilize this pagination over my custom built one, more compact and easier to read
function parsePagination(query={}){
    const rawPage = Number.parseInt(query.page, 10)
    const rawLimit = Number.parseInt(query.limit, 10)
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage: PAGINATION.DEFAULT_PAGE

    let limit = Number.isInteger(rawLimit) && rawLimit > 0 ? rawLimit: PAGINATION.DEFAULT_LIMIT
    if(limit > PAGINATION.MAX_LIMIT) limit = PAGINATION.MAX_LIMIT

    return {page, limit, skip: (page - 1) * limit}
}

function parseSort(sortParam){
    if (!sortParam || typeof sortParam !== 'string') return {...DEFAULT_SORT}

    const sort = {}

    for(const rawField of sortParam.split(',')){
        const field = rawField.trim()
        if(!field) continue

        const descending = field.startsWith('-')
        const name = descending ? field.slice(1) : field

        if(!SORTABLE_FIELDS.includes(name)){
            throw ApiError.badRequest(`Cannot sort by ${name}. Sortable Fields: ${SORTABLE_FIELDS.join(', ')}`)
        }

        sort[name] = descending ? -1 : 1
    }

    return Object.keys(sort).length > 0 ? sort : {...DEFAULT_SORT}
}

function buildMeta({page, limit, total}){
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 0

    return{
        page, limit, total, totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    }
}

function escapeRegex(text){
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildTankFilter(query={}){
    const filter = {}
    if(query.nation && typeof(query.nation) === 'string'){ 
        const cleared = query.nation.trim()
        const match = NATIONS.find(n => n.toLowerCase() === cleared.toLowerCase());
        if(!NATIONS.includes(match)){

            throw ApiError.badRequest(`'${cleared}' is not a supported nation. Valid: ${NATIONS.join(', ')}`)

        }
        filter.nation = match

    }
    if(query.rank && typeof(query.rank) === 'string'){ 
        const cleared = query.rank.trim()
        const match = RANKS.find(n => n.toLowerCase() === cleared.toLowerCase());
        if(!RANKS.includes(match)){

            throw ApiError.badRequest(`'${cleared}' is not a valid rank. Valid: ${RANKS.join(', ')}`)

        }
        filter.nation = match

    }
    if(query.make && typeof(query.make) === 'string'){ 
        const cleared = query.make.trim()
        const match = MAKES.find(n => n.toLowerCase() === cleared.toLowerCase());
        if(!MAKES.includes(match)){

            throw ApiError.badRequest(`'${cleared}' is not a valid make. Valid: ${MAKES.join(', ')}`)

        }
        filter.nation = match

    }
    if(query.crew_number){

        if(!CREW_COUNT.includes(query.crew_number)){

            throw ApiError.badRequest(`'${query.crew_number}' is not a valid crew number. Valid: ${CREW_COUNT.join(', ')}`)

        }
        filter.crew_number = query.crew_number
    }
    if(query.q){

        const pattern = new RegExp(escapeRegex(String(query.q).trim()), 'i')
        filter.$or = [{crew_number:pattern},{make:pattern},{nation:pattern},{rank:pattern}]
    }
    return filter
}
module.exports = {parsePagination, parseSort, buildMeta, buildTankFilter, escapeRegex}