'use strict'

var express = require('express');
var ProjectControllers = require('../controllers/project');

var router = express.Router();

router.get('/home',ProjectControllers.home);
router.post('/test',ProjectControllers.test);
router.post('/save-project',ProjectControllers.saveProject);
router.get('/project/:id?', ProjectControllers.getProject);
router.get('/projects',ProjectControllers.getProjects);
router.put('/project/:id',ProjectControllers.updateProject);
router.delete('/project/:id',ProjectControllers.deleteProject);

module.exports = router;