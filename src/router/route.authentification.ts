import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "..";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { logger } from "../D_winston/winston";
import { info } from "console";

export const authRouter = Router();

authRouter.get("/findUsers", async (req, res) => {
    const allUsers = await User.findAll();
    res.send(allUsers.map(user => user.dataValues));
})


authRouter.post("/local/register", async (req, res) => {

    const { password, email } = req.body;
    const userWithEmail = await User.findOne({ where: { mail: email } });
    if (userWithEmail) {
        res.status(400).send("Email already exists");
    }
    else {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
        const newUser = await User.create({ mdp: hashedPassword, mail: email });
        delete newUser.dataValues.mdp;
        logger.log({
            level: "http",
            message: "hello" + newUser // a compléter (newUser)
        })
        res.send(newUser);
    }

});

authRouter.post("/local", async (req, res) => {
    const { identifier, password } = req.body;
    const userWithEmail = await User.findOne({ where: { mail: identifier } });

    if (!userWithEmail) {
        res.status(400).send("Email or Password is incorrect");
    }
    else {
        const isPasswordCorrect = await bcrypt.compare(password, userWithEmail.dataValues.mdp);
        if (isPasswordCorrect) {
            delete userWithEmail.dataValues.mdp;
            const token = jwt.sign(userWithEmail.dataValues, process.env.JWT_SECRET!);
            res.send({
                token,
                ...userWithEmail.dataValues
            });

        }
        else {
            res.status(400).send("Email or Password is incorrect");
        }
    }
})