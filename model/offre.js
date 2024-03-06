// Fichier offre.js
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
import Utilisateur from "./utilisateur.js";
import Enchere from "./enchere.js";

const Offre = database.define('offre', {
    montant: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    date_offre: { type: DataTypes.DATE, allowNull: false },
    utilisateurId: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'utilisateurId' } },
    enchereId: { type: DataTypes.INTEGER, references: { model: Enchere, key: 'enchereId' } }
})

export default Offre
