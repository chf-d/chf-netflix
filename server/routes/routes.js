const router = require('express').Router();
let User = require('../models/userModel');

//get all useres & details
router.get('/findAll', (req, res) => {
    User.find()
        .then(data => res.json(data))
        .catch(error => res.json(error))
})

// find a user by username
router.get('/findUser/:username', (req, res) => {
    User.find({ username: req.params.username })
        .then(data => res.json(data))
        .catch(error => res.json(error))
})

// add a new user
router.post('/add', (req, res) => {

    const newUser = new User({

        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        movies: [],
        name: req.body.name

    })
    newUser.save()
        .then(data => res.json(data))
        .catch(error => res.json(error))

})

// add a movie to a user
router.post('/addmovie/:id', (req, res) => {

    User.findById(req.params.id)
        .then(user => {
            user.movies = [...user.movies, req.body.movie]
            user.save()
                .then(user => res.json(user))
                .catch(error => res.json(error))
        })

        .catch(err => res.status(400).json('eror ' + err))
})

// delete a user
router.post('/removemovie/:id', (req, res) => {

    User.findById(req.params.id)
        .then(user => {
            user.movies = user.movies.filter(e => e.imdbID != req.body.movie.imdbID)
            user.save()
                .then(user => res.json(user))
                .catch(error => res.json(error))
        })

        .catch(err => res.status(400).json('eror ' + err))
})

module.exports = router