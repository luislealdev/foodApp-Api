// authenticateCoffeeShop.js
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token, secret);
        if (decoded.role !== 'coffeeShop') {
            return res.status(403).json({ message: 'Acceso no autorizado para cafeterías' });
        }
        req.coffeeShop = decoded.coffeeShop; // Puedes almacenar información de la cafetería en req.coffeeShop
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};
