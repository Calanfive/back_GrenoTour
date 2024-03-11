import { Router } from "express";
import { Pref } from "..";
import "dotenv/config";

export const prefRouter = Router();

prefRouter.get("/findPref", async(req, res) => {
    const allpref = await Pref.findAll();
    res.status(200).send(allpref.map(pref => pref.dataValues))
})

prefRouter.post("/register", async(req, res) => {
    const langue = req.body;
    if ( !langue) {
        res.status(400).send("Information manquante")
    }
    else {
        const prefToRegister = await Pref.create(langue);
        res.status(200).send(prefToRegister)
    }
})