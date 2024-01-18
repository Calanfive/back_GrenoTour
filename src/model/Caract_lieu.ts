import { DataTypes, Sequelize } from "sequelize";

export const CaractLieuModel= (sequelize: Sequelize) => {
    return sequelize.define('caractlieu',{
        utilisateur_id: DataTypes.INTEGER,
        lieu_id: DataTypes.INTEGER,
    })
}