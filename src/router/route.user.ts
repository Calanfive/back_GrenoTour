import { Router } from "express";
import { User} from "..";
import jwt from "jsonwebtoken";
import { DecodeToken, checkToken } from "../middlewares/checkToken";

export const userRouter = Router();

userRouter.get("/me", checkToken, async (req, res) => {
    const decoded = jwt.decode(req.token!) as DecodeToken
    const user = await User.findOne({ where: { id: decoded.id } });
    if (user) {
        delete user.dataValues.password;
        res.json(user);
    }
    else {
        res.status(404).send("User not found");
    }
});


userRouter.put("/:id", checkToken, async (req, res) => {
    const { pseudo, mail, telephone, itineraire_id } = req.body.data;
    const actual = await User.findOne({ where: { id: req.params.id } });
    if (actual) {
        const newUser = await actual.update({ pseudo, mail, telephone, itineraire_id });
        res.json(actual);
    }
    else {
        res.status(404).send("User not found");
    }
});