var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { Card } = require('../models');
const { Op } = require('sequelize');


const v = new Validator();


router.get('/popular', async (req, res) => {
    try {
        const popularCards = await Card.findAll({
            where: {
                popularity: {
                    [Op.gt]: 20
                }
            },
            order: [['popularity', 'DESC']]
        });

        res.json(popularCards);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        creator: 'string',
    };

    const validation = v.validate(req.body, schema);

    if (validation.length) {
        return res
            .status(400)
            .json(validation);
    }

    const existingCard = await Card.findOne({
        where: {
            name: req.body.name,
            creator: req.body.creator
        }
    });

    if (existingCard) {
        return res
            .status(409)
            .json({ message: 'Data Card Sudah Ada' });
    }

    const card = await Card.create(req.body);

    res.json(card);
});


router.get('/', async (req, res) => {
    const cards = await Card.findAll();
    return res.json(cards)
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        let card = await Card.findByPk(id);

        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        // Increase the popularity
        card = await card.update({
            popularity: card.popularity + 1
        });

        res.json({ message: 'This Is Your Card', card });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let card = await Card.findByPk(id);

    if (!card) {
        return res.json({ message: "Card not found" });
    }

    const schema = {
        name: { type: 'string', optional: true, empty: false },
        creator: { type: 'string', optional: true, empty: false },
        category: { type: 'enum', values: ['mobile', 'pc', 'voucher'], optional: true, empty: false } 
    };
    
    const validation = v.validate(req.body, schema);

    if (validation.length) {
        return res
            .status(400)
            .json(validation);
    }

    card = await card.update({
        name: req.body.name || card.name, 
        creator: req.body.creator || card.creator,
        category: req.body.category || card.category
    });

    res.json({ message: 'Card updated successfully', card });
});



router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    let card = await Card.findByPk(id);

    if (!card) {
        return res.json({ massage: "tidak ada product"});
    }
    await card.destroy();

    res.json({
        massage: 'Card deleted successfully', card
    })
});



module.exports = router;
