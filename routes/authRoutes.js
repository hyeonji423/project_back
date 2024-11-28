const router = require('express').Router()
const { postAuth, postLogin } = require('../controllers/postAuthCtrl')

router.post('/register', postAuth)
router.post('/login', postLogin)

module.exports = router