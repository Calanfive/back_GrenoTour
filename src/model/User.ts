import { DataTypes, Sequelize } from "sequelize";

export const UserModel  = (sequelize: Sequelize) => {
    return sequelize.define('utilisateurs', {
        favoris_id: {type: DataTypes.INTEGER},
        nom: {type: DataTypes.STRING},
        prenom:{type: DataTypes.STRING},
        mail: {type: DataTypes.STRING},
        mdp: {type: DataTypes.STRING},
        telephone:{type: DataTypes.INTEGER},
    }, {timestamps: false});
}