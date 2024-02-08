import express from 'express';
const prisma = require('../../../db/prisma');

const router = express.Router();

router.get('/', async (req, res) => {
    const { coffeShopId } = req.body;

    try {
        const products = await prisma.product.findMany({
            where: {
                coffeShopId
            },
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos.' });
    }
});


router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: {
                productId
            },
        });

        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto.' });
    }
});

module.exports = router;