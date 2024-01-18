import { DataTypes, Sequelize } from "sequelize";

export const FavorisModel= (sequelize: Sequelize) => {
    return sequelize.define('favoris',{
        utilisateur_id: DataTypes.INTEGER,
        itineraire_id: DataTypes.INTEGER,
    })
}