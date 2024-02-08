module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token, secret);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso no autorizado para administradores' });
        }
        req.admin = decoded.admin; // Puedes almacenar información del administrador en req.admin
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};
