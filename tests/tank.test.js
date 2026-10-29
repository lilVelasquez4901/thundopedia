const request = require('supertest')
const server = require('../src/server')

describe('GET /tank?page=2&limit=2', ()=>{
    it('Should return 2 tanks in the second page');
    const response = await request(server)
    .get('/tanks?page=2&limit=2')
    .expect('Content-Type', '/json/')
    .expect(200)
.expect(Array.isArray(response.body)).toBe(true)
    if(response.body.length > 0){
        expect(typeof response.body[0]).toBe('Object')
        //expect(response.body[0]).toHaveProperty('name)
    }
})