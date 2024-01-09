import express from 'express';

const prisma = require('../../db/prisma');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        // Buscar al usuario por su correo electrónico en la base de datos
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            include: {
                userInfo: {
                    select: {
                        fullName: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar si la contraseña es correcta
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Generar un token JWT con el ID del usuario y el role
        const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_ACCESS_SECRET, // Reemplaza con tu secreto para firmar el token
        );        

        // Enviar el token JWT como respuesta
        res.status(200).json({ id: user.userId, email: user.email, fullName: user.userInfo.fullName, role: user.role, token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión.' });
    }
});

router.post('/register', async (req, res) => {

    const { fullName, email, password1, password2 } = req.body;

    try {
        // Verificar si el correo electrónico ya está registrado
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(401).json({ message: 'El correo electrónico ya está registrado.' });
        }

        if (password1 !== password2) {
            return res.status(401).json({ message: 'Las contraseñas no coinciden.' });
        }

        // Si el correo electrónico no está registrado, crear un nuevo usuario
        const hashedPassword = await bcrypt.hash(password1, 10);

        const newUser = await prisma.$transaction(async (prisma: any) => {
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    userInfo: {
                        create: {
                            fullName,
                        },
                    },
                },
                include: {
                    userInfo: {
                        select: {
                            fullName: true
                        }
                    }
                }
            });

            return user;
        });

        // Generar un token JWT con el ID del usuario y el role
        const token = jwt.sign(
            { userId: newUser.userId },
            process.env.JWT_ACCESS_SECRET,
        );

        // Enviar el token JWT como respuesta
        res.status(200).json({ id: newUser.userId, email: newUser.email, fullName, role: newUser.role, token });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario.' });
    }
});

module.exports = router;