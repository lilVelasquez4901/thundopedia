const express = require('express');
const path = require('path');
const router = express.Router();
const {healthCheck, getAll, getOne, createVehicle, replaceBlueprint, modifyVehicle, destroyAsset} = require('../controllers/resource.controller.js');

router.get('/health', healthCheck);
router.get('/tanks', getAll);
router.get('/tanks/:id', getOne);
router.post('/tanks', createVehicle);
router.put('/tanks/:id', modifyVehicle)
router.patch('/tanks/:id', modifyVehicle);
router.delete('/tanks/:id', destroyAsset);

module.exports = router