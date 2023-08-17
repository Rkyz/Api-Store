const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = process.env;

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token is missing.',
        });
    }

    try {
        const decodedToken = jwt.verify(token, SECRET_TOKEN);
        req.userId = decodedToken.userId; // Menambahkan ID pengguna ke objek permintaan untuk digunakan di rute berikutnya
        next(); // Lanjutkan ke rute berikutnya
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token.',
        });
    }
};

module.exports = {
    authenticateUser,
};
