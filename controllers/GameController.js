const { v4: uuidv4 } = require('uuid');
const { Game } = require('../models');
const multer = require('multer');
const path = require('path');
const Validator = require('fastest-validator');
const v = new Validator();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/joki');
    },
    filename: (req, file, cb) => {
      const uniqueId = uuidv4().replace(/-/g, '');
      const extname = path.extname(file.originalname);
      cb(null, uniqueId + extname);
    },
  });
  
  const upload = multer({ storage });

  const createGameSchema = {
    name: { type: 'string', empty: false },
    creator: { type: 'string', empty: false },
    category: { type: 'enum', values: ['pc', 'mobile', 'voucher'], empty: false },
    type: { type: 'enum', values: ['joki', 'topup'], empty: false },

  };
  
  exports.CreateGame = async (req, res) => {
    try {
      upload.single('image')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: 'Image upload failed' });
        }
  
        if (!req.file) {
          return res.status(400).json({ message: 'No image uploaded' });
        }
  
        const validation = v.validate(req.body, createGameSchema);
  
        if (validation.length) {
          return res.status(400).json(validation);
        }
  
        const { name, creator,category, type } = req.body;
  
        const imageFilename = req.file.filename;
  
        const gameData = {
          id: uuidv4().replace(/-/g, ''),
          name,
          creator,
          category,
          type,
          image: imageFilename,
        };
  
        const game = await Game.create(gameData);
  
        res.json({
          message: 'Game Data created successfully',
          game,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.UpdateGame = async (req, res) => {
    const id = req.params.id;
  
    let game = await Game.findByPk(id);
  
    if (!game) {
      return res.json({ message: 'Game Data not found' });
    }
  
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Image upload failed' });
      }
      const schema = {
        name: { type: 'string', optional: true, empty: false },
      };
  
      const validation = v.validate(req.body, schema);
  
      if (validation.length) {
        return res.status(400).json(validation);
      }
  
  
      if (req.body.name) {
        const existingGameNickname = await Game.findOne({
          where: { name: req.body.name },
        });
  
        if (existingGameNickname && existingGameNickname.id !== game.id) {
          return res.status(400).json({ message: 'Name already exists' });
        }
  
        game.name = req.body.name;
      }
  
      if (req.file) {
        game.image = req.file.filename;
      }
  
      try {
        await game.save();
        res.json({ message: 'Game Data updated successfully', game});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  };

  exports.AllDataGame = async (req, res) => {
    const games = await Game.findAll();
    return res.json({
        massage: "All Your Data Game",
        games
    })  
}


exports.IdDataGame = async (req, res) => {
    const id = req.params.id;

    let game = await Game.findByPk(id);

    if (!game) {
        return res.json({ message: 'Game Data not found' });
      }
    
      return res.json({
        massage: "Here Your Data Id",
        game
      })
}