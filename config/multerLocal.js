const multer = require('multer')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')


//garantir q  pasta uploads exista!!

const uploadDir = path.resolve(__dirname, '..', 'uploads')

if (!fs.existsSync(uploadDir)) {

    console.log('Dir nao existe!!')
    fs.mkdirSync(uploadDir, { recursive: true })
}

//Preciso configurar o DISCO pois vou salvar no server!

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        //gerar um hash aleatorio 
        const hash = crypto.randomBytes(8).toString('hex')
        const ext = path.extname(file.originalname).toLowerCase()

        //Criar o arquivo no server com Data (now), hash nome + extensao
        const nomeLimpo = path.basename(file.originalname, ext)
            .replace(/[^a-zA-Z0-9]/g, '_')
            .toLowerCase()

        console.log('Arquivo sendo salvo!')
        console.log(nomeLimpo)

        cb(null, `${Date.now()}-${hash}-${nomeLimpo}${ext}`)
    }
})

// filtro do arquivo - seguranças
const fileFilter = (req, file, cb) => {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']

    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Tip de arquivo inválido!', false))
    }
}

//fazer do instancia do multer

const uploLocal = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024.  // 5MB
    }

})

module.exports = uploLocal
