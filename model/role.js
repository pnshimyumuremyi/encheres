// Connexion à la base de données
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";

// Création du modèle
const Role = database.define('role', {
    nom_role: { type: DataTypes.STRING, allowNull: false }
});

export default Role;
