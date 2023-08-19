const { v4: uuidv4 } = require('uuid');
const { Joki } = require('../models');
const Validator = require('fastest-validator');
const { GetJokiList } = require('../controllers/HeroController'); 
const v = new Validator();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs'); 
const { Op } = require('sequelize');


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

const createJokiSchema = {
  email: { type: 'string', empty: false },
  password: { type: 'string', empty: false },
  nickname: { type: 'string', empty: false },
  login: { type: 'enum', values: ['google', 'moonton', 'vk', 'tiktok', 'facebook'], empty: false },
  category: { type: 'enum', values: ['paket', 'rank', 'vk', 'gendong', 'classic'], empty: false },
};

exports.CreateJoki = async (req, res) => {
  try {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Image upload failed' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
      }

      const validation = v.validate(req.body, createJokiSchema);

      if (validation.length) {
        return res.status(400).json(validation);
      }

      const { email, password, login, nickname, selectedEnum, category } = req.body;

        const validEnumOptions = (await GetJokiList()).map(option => option.toLowerCase());

        if (!validEnumOptions.includes(selectedEnum.toLowerCase())) {
          return res.status(400).json({ error: 'Invalid enum option' });
        }


      // Validate email format using regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const existingJokiEmail = await Joki.findOne({
        where: { email },
      });

      if (existingJokiEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const existingJokiNickname = await Joki.findOne({
        where: { nickname },
      });

      if (existingJokiNickname) {
        return res.status(400).json({ message: 'Nickname already exists' });
      }

      const imageFilename = req.file.filename;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

      const jokiData = {
        id: uuidv4().replace(/-/g, ''),
        email,
        password: hashedPassword, 
        login,
        nickname,
        selectedEnum,
        category,
        image: imageFilename,
      };

      const joki = await Joki.create(jokiData);

      res.json({
        message: 'Joki profile created successfully',
        joki,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.UpdateJoki = async (req, res) => {
  const id = req.params.id;

  let joki = await Joki.findByPk(id);

  if (!joki) {
    return res.json({ message: 'Joki profile not found' });
  }

  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed' });
    }
    const schema = {
      email: { type: 'string', optional: true, empty: false },
      password: { type: 'string', optional: true, empty: false },
      login: { type: 'enum', values: ['google', 'moonton', 'vk', 'tiktok', 'facebook'], optional: true, empty: false },
    };

    const validation = v.validate(req.body, schema);

    if (validation.length) {
      return res.status(400).json(validation);
    }

    if (req.body.email) {
      const existingJokiEmail = await Joki.findOne({
        where: { email: req.body.email },
      });

      if (existingJokiEmail && existingJokiEmail.id !== joki.id) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      joki.email = req.body.email;
    }

    if (req.body.password) {
      joki.password = req.body.password;
    }

    if (req.body.login) {
      joki.login = req.body.login;
    }

    if (req.body.nickname) {
      const existingJokiNickname = await Joki.findOne({
        where: { nickname: req.body.nickname },
      });

      if (existingJokiNickname && existingJokiNickname.id !== joki.id) {
        return res.status(400).json({ message: 'Nickname already exists' });
      }

      joki.nickname = req.body.nickname;
    }

    if (req.file) {
      joki.image = req.file.filename;
    }

    try {
      await joki.save();
      res.json({ message: 'Joki profile updated successfully', joki });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};


exports.GetJokiList = async (req, res) => {
  try {
    const jokis = await Joki.findAll();
    res.json({ message: 'Joki list retrieved successfully', jokis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.GetJokiById = async (req, res) => {
  const id = req.params.id;

  try {
    const joki = await Joki.findByPk(id);
    if (!joki) {
      return res.status(404).json({ message: 'Joki profile not found' });
    }
    res.json({ message: 'Joki profile retrieved successfully', joki });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
