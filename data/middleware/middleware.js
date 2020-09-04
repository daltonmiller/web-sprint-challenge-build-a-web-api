const actions = require('../data/helpers/actionModel')
const projects = require('../data/helpers/projectModel')

const checkProjectId = (req, res, next) => {
    const id = req.params.id
    projects.get(id)
    .then((project) => {
        if(project) {
            req.project = project
            next()
        }else{
            res.status(400).json({
                errorMessage: 'invalid post id'
            })
        }
    })
    .catch((error) => {
        next(new Error('could not check id'))
    })
}

const checkProject = (req, res, next) => {
    if(req.body) {
        if(req.body.name) {
            next()
        }else{
            res.status(400).json({
                errorMessage: 'missing field'
            })
        }
    }else{
        res.status(400).json({
            errorMessage: 'missing project data'
        })
    }
}

const checkAction = (req, res, next) => {
    if(req.body) {
        if(req.body.description) {
            next()
        }else{
            res.status(400).json({
                errorMessage: "missing required field"
            })
        }
    }
}

module.exports = {
    checkProjectId,
    checkProject,
    checkAction
}