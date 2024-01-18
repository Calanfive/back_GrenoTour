import { DataTypes, Sequelize } from "sequelize";

export const ItineraireModel= (sequelize: Sequelize) => {
    return sequelize.define('itineraire',{
        nb_pions: DataTypes.INTEGER,
        nbr_voyageurs: DataTypes.INTEGER,
        nbr_restaurants: DataTypes.INTEGER,
        nbr_loisirs: DataTypes.INTEGER,
        nbr_bars: DataTypes.INTEGER
    })
}