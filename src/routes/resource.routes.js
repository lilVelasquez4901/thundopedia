const express = require('express');
const router = express.Router();
const resControl = require('../controllers/resource.controller.js');
const resService = require('../services/resource.service.js')
const {requireAuth} = require('../middleware/auth.js')

//Controller Functions
// router.get('/health', resControl.healthCheck);
// router.get('/tanks', resControl.getAll);
// router.get('/tanks/:id', resControl.getOne);
// router.post('/tanks', resControl.createVehicle);
// router.put('/tanks/:id', resControl.replaceBlueprint)
// router.patch('/tanks/:id', resControl.modifyVehicle);
// router.delete('/tanks/:id', resControl.destroyAsset);
router.get('/health', resControl.healthCheck)
router
    .route('/tanks')
        .get(resControl.getAll)
        .post(requireAuth, resControl.createVehicle)

router
    .route('/tanks/:id')
    .get(resControl.getOne)
    .put(requireAuth, resControl.replaceBlueprint)
    .patch(requireAuth, resControl.modifyVehicle)
    .delete(requireAuth, resControl.destroyAsset)


//Service Functions
// router.get('/tanks/make/:make', resControl.findMaker)
// router.get('/tanks/rank/:rank', resControl.findRank)
// router.get('/tanks/crew/:crew_number', resControl.findCrew)
// router.get('/tanks/custom/:custom', resControl.findCustom)
// router.get('/tanks/nation/:nation', resControl.findNation)
// router.get('/tanks/cars/:isCar', resControl.findCars)
// router.get('/tanks/creator/:creator', resControl.findCreator) //Should find a way to account for creators who do not exist
router
        .get('tanks/make/:make', resControl.findMaker)
        .get('tanks/rank/:rank', resControl.findRank)
        .get('tanks/crew/:crew_number', resControl.findCrew)
        .get('tanks/custom/:custom', resControl.findCustom)
        .get('tanks/nation/:nation', resControl.findNation)
        .get('tanks/cars/:isCar', resControl.findCars)
        .get('tanks/creator/:creator', resControl.findCreator)

module.exports = router