/** Retorna o arquivo de imagem em base64 para visualização */
exports.getFileUploaded = async (req, res) => {
    let file = req.files.file;
    var fileBase64 = file.data.toString('base64');
    res.json(fileBase64);
}

