const ROLES = Object.freeze({USER: 'user', ADMIN: 'admin'})
const ROLE_VALUES = Object.freeze(Object.values(ROLES))

const AUTH = Object.freeze({
    SALT_ROUNDS:10,
    DEFAULT_JWT_EXPIRES_IN:'7d',
    BEARER_PREFIX:'Bearer'
})
const SORTABLE_FIELDS = Object.freeze([
    'createdAt', 'updatedAt', 'name'
])
const API_PREFIX = '/api/v1/'
const PAGINATION = Object.freeze({
    DEFAULT_PAGE:1, DEFAULT_LIMIT:20, MAX_LIMIT:100
})
const DEFAULT_SORT = Object.freeze({createdAt: -1})
const NATIONS = Object.freeze([
    'UK', 'USSR', 'USA', 'Sweden', 'France', 'China', 'Japan', 'Germany', 'Italy', 'Israel'
])
const RANKS = Object.freeze([
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'
])
const MAKES = Object.freeze([
    'Light_Tank', 'Medium_Tank', 'Heavy_Tank', 'Tank_Destroyer', 'SPAA'
])
const CREW_COUNT = Object.freeze([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
])
module.exports = {ROLES, ROLE_VALUES, AUTH, API_PREFIX, PAGINATION, SORTABLE_FIELDS, NATIONS, RANKS, MAKES, CREW_COUNT}