import { DataTypes, Sequelize } from "sequelize";

export const ItineraireModel= (sequelize: Sequelize) => {
    return sequelize.define('itineraire',{
        nb_pions: DataTypes.INTEGER,
        nb_voyageurs: DataTypes.INTEGER,
        nb_restaurants: DataTypes.INTEGER,
        nb_loisirs: DataTypes.INTEGER,
        nb_bars: DataTypes.INTEGER
    })
}