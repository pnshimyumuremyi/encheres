import { Router } from "express";
import { body, param, validationResult } from 'express-validator';
import { getAllCommentaires, getCommentaireById, createCommentaire, updateCommentaire, deleteCommentaire,getCommentairesByEnchereId } from "../controller/commentaire.js";
import { authenticateToken } from "../model/auth.js";

const commentaire = Router();

const validateCommentaire = [
  body('contenu').notEmpty().withMessage('Le contenu du commentaire est obligatoire'),
  body('date_commentaire').notEmpty().withMessage('La date du commentaire est obligatoire'),
  body('utilisateurId').notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire'),
  body('enchereId').notEmpty().withMessage('L\'ID de l\'enchère est obligatoire'),
];

commentaire
  .get("/",authenticateToken, getAllCommentaires)
<<<<<<< HEAD
  .get("/enchere/:id",authenticateToken, getCommentairesByEnchereId)
=======
  .get("/enchre/:id",authenticateToken, getCommentairesByEnchereId)
>>>>>>> 58efb3a3d88da36c6b16fce594e1f3d50a1dfacc
  .get("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'),authenticateToken, getCommentaireById)
  .post("/:id", validateCommentaire, authenticateToken,createCommentaire)
  .put("/:id", [
    param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'),
    ...validateCommentaire,
  ],authenticateToken, updateCommentaire)
  .delete("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'), authenticateToken,deleteCommentaire);

export default commentaire;
