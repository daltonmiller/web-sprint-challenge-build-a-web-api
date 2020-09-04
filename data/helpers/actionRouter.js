const express = require('express');
const router = express.Router();

const actionModel = require('../helpers/actionModel')

const cm = require('../../middleware/middleware')
const checkActionId = cm.checkActionId
const checkAction = cm.checkAction

router.get('/', (req, res) => {
    actionModel.get()
    .then(action => {
        if(action) {
            res.status(200).json(action)
        }else{
            res.status(404).json({ errorMessage: "none found"})
        }
    })
    .catch(error => {
        res.status(500).json({error: 'there was an error'})
    })
})

router.get('/:id', checkActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.delete('/:id', checkActionId, (req, res) => {
    const id = req.params.id
    actionModel.remove(id)
    .then(() => res.status(200).json())
    .catch(error => {
        res.status(500).json({error: 'there was an error'})
    })
})

router.put('/:id', checkActionId, checkAction, (req, res) => {
    const id = req.params.id
    actionModel.update(id, { description: req.body.description, notes: req.body.notes, completed: req.body.completed})
    .then(() => {
        res.status(200).json({...req.body,  description: req.body.description, notes: req.body.notes, completed: req.body.completed})
    })
    .catch(error => {
        res.status(500).json({error: 'there was an error'})
    })

})



module.exports = router