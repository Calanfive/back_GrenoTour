import { DataTypes, Sequelize } from "sequelize";

export const PointDePassageModel= (sequelize: Sequelize) => {
    return sequelize.define('pointdepassage',{
        lieu_id: DataTypes.STRING,
        itineraire_id: DataTypes.STRING,
    })
}