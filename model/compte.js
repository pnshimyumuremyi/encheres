// Fichier compte.js
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
import Utilisateur from "./utilisateur.js";

const Compte = database.define('compte', {
    solde: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    utilisateurId: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'utilisateurId' } }
});

export default Compte;