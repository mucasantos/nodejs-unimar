
const express = require('express')
const router = express.Router()

const uploadLocal = require('../config/multerLocal')

const uploadController = require('../controllers/UploadController')

//upload local

router.post('/local', uploadLocal.single('arquivo'), (req, res, next) => {
    uploadController.uploadLocal(req, res, next)
})

module.exports = router
//upload multiplos



//upload cloud