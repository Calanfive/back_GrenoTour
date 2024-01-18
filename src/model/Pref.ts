import { DataTypes, Sequelize } from "sequelize";

export const Pref= (sequelize: Sequelize) => {
    return sequelize.define('pref',{
        langue: DataTypes.STRING
    })
}