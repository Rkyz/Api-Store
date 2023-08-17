const { Info } = require('../models');
const Validator = require('fastest-validator');
const v = new Validator();



exports.Information = async (req, res) => {
    const infos = await Info.findAll();
    return res.json(infos)
}

exports.InformationCreate = async (req, res) => {
    const schema = {
        linkyt: 'string',
    };

    const validation = v.validate(req.body, schema);

    if (validation.length) {
        return res
            .status(400)
            .json(validation);
    }

    const existingLink = await Info.findOne({
        where: {
            linkyt: req.body.linkyt,
        }
    });

    if (existingLink) {
        return res
            .status(409)
            .json({ message: 'Link Sudah Ada' });
    }

    const card = await Info.create(req.body);
    res.json(card);


}

exports.InformationEdit = async (req, res) => {
    const id = req.params.id;

    let info = await Info.findByPk(id);

    if (!info) {
        return res.json({ message: "Link not found" });
    }

    const schema = {
        linkyt: { type: 'string', empty: false }, 
    };
    
    const validation = v.validate(req.body, schema);

    if (validation.length) {
        return res
            .status(400)
            .json(validation);
    }

    info = await info.update({
        linkyt: req.body.linkyt || info.linkyt, // Menggunakan nama kolom yang sesuai
    });

    res.json({ message: 'Link updated successfully', info });
};

exports.InformationDelete = async (req, res) => {
    const id = req.params.id;

    let info = await Info.findByPk(id);

    if (!info) {
        return res.json({ massage: "tidak ada link"});
    }
    await info.destroy();

    res.json({
        massage: 'Card deleted successfully', info
    })
}