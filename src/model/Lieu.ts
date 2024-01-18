import { DataTypes, Sequelize } from "sequelize";

export const LieuModel= (sequelize: Sequelize) => {
    return sequelize.define('lieu',{
        nb_visiteur: DataTypes.INTEGER,
        nb_visiteur_mois: DataTypes.INTEGER,
        nb_etoile: DataTypes.INTEGER,
        duree: DataTypes.INTEGER,
        telephone: DataTypes.STRING,
        adresse: DataTypes.STRING,
        mail: DataTypes.STRING
    })
}