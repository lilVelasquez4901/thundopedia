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
router.get('/tanks/make/:make', resService.pickByMake)

module.exports = router