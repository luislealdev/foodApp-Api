import express from 'express';
const prisma = require('../../../db/prisma');

const router = express.Router();

// Get products by category
router.get('/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId
            },
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos.' });
    }
});


module.exports = router;