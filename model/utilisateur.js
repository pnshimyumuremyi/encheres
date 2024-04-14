// Fichier utilisateur.js
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
import Role from "./role.js";

const Utilisateur = database.define('utilisateur', {
    nom: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, references: { model: Role, key: 'roleId' } }
});

export default Utilisateur;
