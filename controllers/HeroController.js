const { Hero } = require('../models'); // Pastikan path ke model Hero sudah benar
const Validator = require('fastest-validator');
const v = new Validator();

const createHeroSchema = {
    name: { type: 'string', empty: false },
};

exports.CreateHero = async (req, res) => {
    try {
        const validation = v.validate(req.body, createHeroSchema);

        if (validation.length) {
            return res.status(400).json(validation);
        }

        const { name } = req.body;

        const existingHero = await Hero.findOne({
            where: { name },
        });

        if (existingHero) {
            return res.status(400).json({ message: 'Hero name already exists' });
        }

        const heroData = {
            name,
        };

        const hero = await Hero.create(heroData);

        res.json({
            message: 'Hero created successfully',
            hero,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.GetJokiList = async (req, res) => {
    try {
      const heros = await Hero.findAll(); // Ambil semua data hero
      const heroNames = heros.map(hero => hero.name); // Ambil hanya nama-nama hero
      return heroNames;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
