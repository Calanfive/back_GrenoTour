import { DataTypes, Sequelize } from "sequelize";

export const CaractLieuModel= (sequelize: Sequelize) => {
    return sequelize.define('caractlieu',{
        caracteristiques_id: DataTypes.INTEGER,
        lieu_id: DataTypes.INTEGER,
    }, {timestamps: false});
}