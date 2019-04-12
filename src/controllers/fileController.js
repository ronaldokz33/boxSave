const file = require('../models/file');
const box = require('../models/box');

class fileController {
    async store(req, res) {
        const _box = await box.findById(req.params.id);

        const _file = await file.create({
            title: req.file.originalname,
            path: req.file.key
        });

        _box.files.push(_file)

        _box.save();

        req.io.sockets.in(box._id).emit('file', file);

        return res.json(_file);
    }
}

module.exports = new fileController();