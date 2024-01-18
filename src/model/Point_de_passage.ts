import { DataTypes, Sequelize } from "sequelize";

export const PointDePassageModel= (sequelize: Sequelize) => {
    return sequelize.define('pointdepassage',{
        pseudonyme: DataTypes.STRING,
        mail: DataTypes.STRING,
        mdp: DataTypes.STRING,
        telephone: DataTypes.STRING
    })
}