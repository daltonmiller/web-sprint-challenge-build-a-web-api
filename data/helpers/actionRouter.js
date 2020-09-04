const express = require('express');
const router = express.Router();

const actionModel = require('../helpers/actionModel')

router.get('/', (req, res) => {
    actionModel.get()
    .then(action => {
        if(action) {
            res.status(200).json(posts)
        }else{
            res.status(404).json({ errorMessage: "none found"})
        }
    })
    .catch(error => {
        res.status(500).json({error: 'there was an error'})
    })
})


module.exports = router