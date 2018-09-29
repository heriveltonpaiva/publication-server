const Arquivo = require('../models/arquivo.model.js');

/** Retorna o arquivo de imagem em base64 para visualização */
exports.getFileUploaded = async (req, res) => {
    let file = req.files.file;
    var fileBase64 = file.data.toString('base64');
    res.json(fileBase64);
}

exports.saveArquivo = async(req, res) => {
    const novoDoc = new Arquivo(req.body);
    novoDoc.data = 'data:image/jpg;base64,'+req.body.data.toString('base64');
    try {
        await novoDoc.save();
    }catch (error) {
        console.log(error.toString());
        res.status(500).json(error.toString());
    }
    res.status(200).json(novoDoc._id);
};

