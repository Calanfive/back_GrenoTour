import { DataTypes, Sequelize } from "sequelize";

export const PrefModel= (sequelize: Sequelize) => {
    return sequelize.define('pref',{
        langue: DataTypes.STRING
    })
}