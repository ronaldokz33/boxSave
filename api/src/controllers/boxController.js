const box = require('../models/box');

class boxController {
    async store(req, res) {

        const _box = await box.create({ title: req.body.title });

        return res.json(_box);
    }

    async show(req, res) {

        const _box = await box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }
        });

        return res.json(_box);
    }
}

module.exports = new boxController();