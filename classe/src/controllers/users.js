const knex = require('../connection');
const nodemailer = require('../nodemailer');

const registerUser = async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(404).json({ message: "O campo nome é obrigatório" });
    };

    if (!email || email.trim() === "") {
        return res.status(404).json({ message: "O campo email é obrigatório" });
    };

    try {
        const users = await knex('usuarios').where({ email }).first();

        if (users) {
            return res.status(400).json("O email já existe");
        }

        const user = await knex('usuarios')
            .insert({ nome, email })
            .returning('*');

        if (user[0] === 0) {
            return res.status(400).json("O usuário não foi cadastrado.");
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const sendEmail = async (req, res) => {
    const { texto } = req.body

    try {
        const emails = await knex('usuarios');

        emails.map(function (datas) {
            const sendData = {
                from: 'Seu NewsLetter <nao-responder@email.com>',
                to: datas.email,
                subject: "Seu Newsletter",
                text: `Olá, ${datas.nome}. ${texto}`,
            }

            nodemailer.sendMail(sendData);
        });

        return res.status(200).json("Email enviado");
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    registerUser,
    sendEmail
}