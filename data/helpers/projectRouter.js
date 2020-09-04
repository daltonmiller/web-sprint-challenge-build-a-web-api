const express = require('express');
const router = express.Router();

const projectModel = require('../helpers/projectModel')
const actionModel = require('../helpers/actionModel')

const cm = require('../../middleware/middleware')
const checkProjectId = cm.checkProjectId
const checkProject = cm.checkProject
const checkAction = cm.checkAction
const checkActionId = cm.checkActionId


router.get('/', (req, res) => {
    projectModel.get()
    .then(project => {
        if(project) {
            res.status(200).json(project)
        }else{
            res.status(404).json({ errorMessage: "no users found"})
        }
    })
    .catch()
})

// router.get('/')

router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:id/action/:id', checkProjectId, checkActionId, (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:id/actions', checkProjectId, (req, res) => {
    const id = req.params.id
    actionModel.get(id)
    .then(actions => {
        if (actions) {
            res.status(200).json(actions)
        }else{
            res.status(404).json({errorMessage: "none found"})
        }
    })
    .catch(error => {
        res.status(500).json({error: "could not get posts by user"})
    })
})

router.post('/', checkProject, (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.completed)
    {
       res.status(400).json({ errorMessage: "missing fields"})
    }
    projectModel.insert(req.body)
    .then((projects) => {
        res.status(201).json(projects)
    })
})

router.post('/:id/action', checkProjectId, checkAction, (req, res) => {
    const id = req.params.id
    actionModel.insert({ project_id: id, description: req.body.description, notes: req.body.notes, completed: req.body.completed})
    .then(action => {res.status(201).json(action)})
    .catch(error => {res.status(500).json({message: "could not add"})})
})

router.delete('/:id', checkProjectId, (req, res) => {
    const id = req.params.id
    projectModel.remove(req.params.id)
    .then(() => {res.status(200).json({success: true})})
    .catch(error => {res.status(500).json({error:"could not delete"})})
})

router.put('/:id', checkProjectId, checkProject, (req, res) => {
    const id = req.params.id
    projectModel.update(id, { name: req.body.name, description: req.body.description, completed: req.body.completed})
    .then(() => {
        res.status(200).json({...req.body,  description: req.body.description, name: req.body.name, completed: req.body.completed})
    })
    .catch(error => {
        res.status(500).json({error: "there was an error"})
    })
})







module.exports = router