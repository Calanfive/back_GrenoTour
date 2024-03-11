import { Router } from "express";
import { User} from "..";
import "dotenv/config";

export const userRouter = Router();

userRouter.get("/findUser", async(req, res) => {
    const alluser = await User.findAll();
    res.status(200).send(alluser.map(User => User.dataValues))
})

userRouter.post("/register", async(req, res) => {
    const {pseudo, mail, mdp, telephone } = req.body;
    if ( !pseudo || !mail || !mdp || !telephone) {
        res.status(400).send("Information manquante")
    }
    else {
        const userToRegister = await User.create();
        res.status(200).send(userToRegister)
    }
})