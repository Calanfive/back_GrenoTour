import { DataTypes, Sequelize } from "sequelize";

export const CaracteristiquesModel= (sequelize: Sequelize) => {
    return sequelize.define('caracteristiques',{
        name: DataTypes.STRING
    }, {timestamps: false});
}