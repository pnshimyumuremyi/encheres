import { Router } from "express";
import { body, param, validationResult } from 'express-validator';
import { getAllCommentaires, getCommentaireById, createCommentaire, updateCommentaire, deleteCommentaire } from "../controller/commentaire.js";

const commentaire = Router();

const validateCommentaire = [
  body('contenu').notEmpty().withMessage('Le contenu du commentaire est obligatoire'),
  body('date_commentaire').notEmpty().withMessage('La date du commentaire est obligatoire'),
  body('utilisateurId').notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire'),
  body('enchereId').notEmpty().withMessage('L\'ID de l\'enchère est obligatoire'),
];

commentaire
  .get("/", getAllCommentaires)
  .get("/:id", param('id').isMongoId().withMessage('L\'ID doit être un ObjectId valide'), getCommentaireById)
  .post("/", validateCommentaire, createCommentaire)
  .put("/:id", [
    param('id').isMongoId().withMessage('L\'ID doit être un ObjectId valide'),
    ...validateCommentaire,
  ], updateCommentaire)
  .delete("/:id", param('id').isMongoId().withMessage('L\'ID doit être un ObjectId valide'), deleteCommentaire);

export default commentaire;
