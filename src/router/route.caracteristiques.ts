import { Router } from "express";
import { Caracteristiques } from "..";
import "dotenv/config";

export const caracteriRouter = Router();

caracteriRouter.get("/findCaracteri", async(req, res) => {
    const allcaracteri = await Caracteristiques.findAll();
    res.status(200).send(allcaracteri.map(caracteristiques => caracteristiques.dataValues))
})

caracteriRouter.post("/register", async(req, res) => {
    const name = req.body;
    if ( !name) {
        res.status(400).send("Information manquante")
    }
    else {
        const caracteriToRegister = await Caracteristiques.create(name);
        res.status(200).send(caracteriToRegister)
    }
})
