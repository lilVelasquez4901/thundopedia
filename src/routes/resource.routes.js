const express = require('express');
const path = require('path');
const router = express.Router();
const resControl = require('../controllers/resource.controller.js');
const resService = require('../services/resource.service.js')

//Controller Functions
router.get('/health', resControl.healthCheck);
router.get('/tanks', resControl.getAll);
router.get('/tanks/:id', resControl.getOne);
router.post('/tanks', resControl.createVehicle);
router.put('/tanks/:id', resControl.replaceBlueprint)
router.patch('/tanks/:id', resControl.modifyVehicle);
router.delete('/tanks/:id', resControl.destroyAsset);

//Service Functions
router.get('/tanks/make/:make', resControl.findMaker)
router.get('/tanks/rank/:rank', resControl.findRank)
router.get('/tanks/crew/:crew_number', resControl.findCrew)
router.get('/tanks/custom/:custom', resControl.findCustom)
router.get('/tanks/nation/:nation', resControl.findNation)
router.get('/tanks/cars/:isCar', resControl.findCars)
router.get('/tanks/creator/:creator', resControl.findCreator) //Should find a way to account for creators who do not exist


module.exports = router