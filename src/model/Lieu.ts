import { DataTypes, Sequelize } from "sequelize";

export const LieuModel= (sequelize: Sequelize) => {
    return sequelize.define('lieu',{
        nb_visiteurs: DataTypes.INTEGER,
        nb_visiteurs_mois: DataTypes.INTEGER,
        nb_etoiles: DataTypes.INTEGER,
        duree: DataTypes.INTEGER,
        telephone: DataTypes.STRING,
        adresse: DataTypes.STRING,
        mail: DataTypes.STRING
    })
}