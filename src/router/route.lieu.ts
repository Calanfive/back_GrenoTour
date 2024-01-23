import { Router } from "express";
import { Lieu } from "..";
import "dotenv/config";

export const lieuRouter = Router();

lieuRouter.get("/findLieux", async(req, res) => {
    const allLieux = await Lieu.findAll();
    res.status(200).send(allLieux.map(lieu => lieu.dataValues))
})

lieuRouter.post("/register", async(req, res) => {
    const lieuToRegister = await Lieu.create({ 
        nb_visiteurs: 1,
        nb_visiteurs_mois: 2, 
        nb_etoiles: 3, 
        duree: 4, 
        telephone: 5, 
        adresse: 6, 
        mail: 7 
    });
    res.status(200).send(lieuToRegister)
})