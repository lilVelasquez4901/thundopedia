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
            throw ApiError.badrequest(`Cannot sort by ${name}. Sortable Fields: ${SORTABLE_FIELDS.join(', ')}`)
        }

        sort[name] = descendin ? -1 : 1
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

    if(query.nation){

        if(!NATIONS.includes(query.nation)){

            throw ApiError.badrequest(`'${query.nation}' is not a supported location. Valid: ${NATIONS.join(', ')}`)

        }
        filter.nation = query.nation

    }
    if(query.rank){

        if(!RANKS.includes(query.rank)){

            throw ApiError.badrequest(`'${query.rank}' is not a supported location. Valid: ${RANKS.join(', ')}`)

        }
        filter.rank = query.rank

    }
    if(query.make){

        if(!MAKES.includes(query.make)){

            throw ApiError.badrequest(`'${query.make}' is not a supported location. Valid: ${MAKES.join(', ')}`)

        }
        filter.make = query.make

    }
    if(query.crew_number){

        if(!CREW_COUNT.includes(query.crew_number)){

            throw ApiError.badrequest(`'${query.crew_number}' is not a supported location. Valid: ${CREW_COUNT.join(', ')}`)

        }
        filter.crew_number = query.crew_number
    }
    if(query.q){

        const pattern = new RegExp(escapeRegex(String(query.q).trim()), 'i')
        filter.$or = [{nickname:pattern},{make:pattern}]
    }
    return filter
}
module.exports = {parsePagination, parseSort, buildMeta, buildTankFilter, escapeRegex}