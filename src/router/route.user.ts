import { Router } from "express";
import { User} from "..";
import "dotenv/config";

export const userRouter = Router();

userRouter.get("/findUserMe", async(req, res) => {
    const alluser = await User.findAll();
    res.status(200).send(alluser.map(User => User.dataValues))
})

//put (update)