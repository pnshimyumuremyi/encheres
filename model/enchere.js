// Fichier enchere.js
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
import Utilisateur from "./utilisateur.js";

const Enchere = database.define('enchere', {
    titre: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    prix_depart: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    date_debut: { type: DataTypes.DATE, allowNull: false },
    date_fin: { type: DataTypes.DATE, allowNull: false },
    utilisateurId: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'utilisateurId' } }
})

export default Enchere
