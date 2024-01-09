import { PrismaClient } from "@prisma/client";

const prisma:PrismaClient = require('../../db');

export const deleteAllData = async () => {
    await prisma.$transaction([
        prisma.state.deleteMany({}),
        prisma.city.deleteMany({}),
        prisma.institute.deleteMany({}),
        prisma.coffeeShop.deleteMany({}),
        prisma.payment.deleteMany({}),
        prisma.order.deleteMany({}),
        prisma.user.deleteMany({}),
        prisma.product.deleteMany({})
    ]);
}
