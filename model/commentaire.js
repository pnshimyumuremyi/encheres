// Fichier commentaire.js
import database from "../config/connexion.js";
import { DataTypes } from "sequelize";
import Utilisateur from "./utilisateur.js";
import Enchere from "./enchere.js";

const Commentaire = database.define('commentaire', {
    contenu: { type: DataTypes.TEXT, allowNull: false },
    date_commentaire: { type: DataTypes.DATE, allowNull: false },
    utilisateurId: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'utilisateurId' } },
    enchereId: { type: DataTypes.INTEGER, references: { model: Enchere, key: 'enchereId' } }
})

export default Commentaire
