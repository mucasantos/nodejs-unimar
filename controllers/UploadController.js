//chamar os servicos

class UploadController {

    async uploadLocal(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    error: 'Precisa enviar um arquivo!'
                })
            }
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const fileUrl = `${baseUrl}/uploads/${req.file.filename}`

            return res.status(201).json({
                message: 'Upload com sucesso!',
                tipo: 'Armazenamento LOCAL',
                arquivo: {
                    nomeOriginal: req.file.originalname,
                    urlFile: fileUrl
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UploadController()