const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const { v4: uuidv4 } = require('uuid');


const saltRounds = 10;
const { SECRET_TOKEN } = process.env;


exports.allAcc = async (req, res) => {
    try {
      const allAccounts = await User.findAll(); 
  
      res.json({
        success: true,
        data: allAccounts,
      });
    } catch (error) {
      console.error('An error occurred while fetching all accounts:', error);
  
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching all accounts.',
      });
    }
  };

  
exports.protectedRoute = async (req, res) => {
    try {
        // Anda dapat mengakses informasi pengguna yang terautentikasi melalui req.userId
        const userId = req.userId;

        // Di sini Anda dapat melakukan apa pun yang perlu dilakukan pada rute yang dilindungi
        // Misalnya, mengambil data pengguna dari basis data dan mengirimkannya sebagai respons
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token.",
            });
        }

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user data.",
        });
    }
};



exports.Register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address format.",
            });
        }

        // Generate UUID without dashes
        const idWithoutDashes = uuidv4().replace(/-/g, '');

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const register = await User.create({
            id: idWithoutDashes,
            username: username,
            email: email,
            role: role,
            password: hashedPassword,
        });

        res.json({
            success: true,
            data: register,
        });
    } catch (error) {
        console.error(error);

        let errorMessage = "An error occurred while registering.";
        if (error.name === "SequelizeUniqueConstraintError") {
            if (error.errors[0].path === "email") {
                errorMessage = "This email is already registered.";
            } else if (error.errors[0].path === "username") {
                errorMessage = "This username is already taken.";
            } else {
                errorMessage = "Email or username already exists.";
            }
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
        });
    }
};




exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }
        
        const user = await User.findOne({ where: { email: email } });
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_TOKEN, { expiresIn: '1h' });

        res.json({
            success: true,
            message: "Login successful.",
            token: token,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "An error occurred while logging in.",
        });
    }
};

exports.getUserSignin = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, SECRET_TOKEN);


        const user = await User.findByPk(decodedToken.userId, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token.",
            });
        }

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user data.",
        });
    }
};


exports.editUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, role } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;

        await user.save();

        res.json({
            success: true,
            message: "User data updated successfully.",
            data: user,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "An error occurred while updating user data.",
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user data.",
        });
    }
};
