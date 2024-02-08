// authenticateClient.js
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token, secret);
        req.client = decoded.client;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

