const router = require('express').Router()
const { postAuth } = require('../controllers/postAuthCtrl')

router.post('/register', postAuth)

module.exports = router