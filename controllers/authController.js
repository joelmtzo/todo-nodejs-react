const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) return res.status(400).json({ msg: "El usuario ya existe" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ msg: "Usuario registrado" });
    } catch (err) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ msg: "Credenciales incorrectas" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Credenciales incorrectas" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "12h" });

        console.log(token);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
