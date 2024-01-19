import { DataTypes, Sequelize } from "sequelize";

export const UserModel  = (sequelize: Sequelize) => {
    return sequelize.define('utilisateurs', {
        pseudo: {type: DataTypes.STRING},
        mail: {type: DataTypes.STRING},
        mdp: {type: DataTypes.STRING},
        telephone:{type: DataTypes.STRING},
    }, {timestamps: false});
}