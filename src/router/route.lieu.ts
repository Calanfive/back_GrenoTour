import { Router } from "express";
import { Lieu } from "..";
import "dotenv/config";

export const lieuRouter = Router();

lieuRouter.get("/findLieux", async(req, res) => {
    const allLieux = await Lieu.findAll();
    res.status(200).send(allLieux.map(lieu => lieu.dataValues))
})

lieuRouter.post("/register", async(req, res) => {
    const {nb_visiteurs, nb_visiteurs_mois, nb_etoiles, duree, telephone, adresse, mail} = req.body;
    const lieuToRegister = await Lieu.create({ 
        nb_visiteurs, 
        nb_visiteurs_mois, 
        nb_etoiles, duree, 
        telephone, adresse, 
        mail
    });
    res.status(200).send(lieuToRegister)
})