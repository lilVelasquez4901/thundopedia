'use strict'
const express = require('express');
const resControl = require('../controllers/resource.controller.js');
const {requireAuth} = require('../middleware/auth.js')

const router = express.Router();

router
    .route('/')
        .get(resControl.getAll)
        .post(requireAuth, resControl.createVehicle)

router
    .route('/:id')
        .get(resControl.getOne)
        .put(requireAuth, resControl.replaceBlueprint) //Authentication required because interacts with database permanently
        .patch(requireAuth, resControl.replaceBlueprint) //Should function for both
        .delete(requireAuth, resControl.destroyAsset)
//Too specific to simplify like the rest above
router
    .get('/make/:make', resControl.findMaker)
    .get('/rank/:rank', resControl.findRank)
    .get('/crew/:crew_number', resControl.findCrew)
    .get('/custom/:custom', resControl.findCustom)
    .get('/nation/:nation', resControl.findNation)
    .get('/cars/:isCar', resControl.findCars)
    .get('/creator/:creator', resControl.findCreator) 

module.exports = router