import express from 'express';
const prisma = require('../../db/prisma');

const router = express.Router();

// Get orders by userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId
            },
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener las ordenes:', error);
        res.status(500).json({ message: 'Error al obtener las ordenes.' });
    }
});



module.exports = router;