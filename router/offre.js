import { Router } from "express";
import { body, param } from 'express-validator';
import { getAllOffres, getOffreById, createOffre, updateOffre, deleteOffre, getOffresByEnchereId } from "../controller/offre.js";
import { authenticateToken } from "../model/auth.js";

const offre = Router();

const validateOffre = [
  body('montant').notEmpty().isNumeric().withMessage('Le montant est obligatoire et doit être un nombre'),
  body('date_offre').isISO8601().toDate().withMessage('La date de l\'offre doit être au format ISO8601'),
  body('utilisateurId').notEmpty().isNumeric().withMessage('L\'ID de l\'utilisateur doit être un ObjectId valide'),
  body('enchereId').notEmpty().isNumeric().withMessage('L\'ID de l\'enchère doit être un ObjectId valide'),
];

offre
  .get("/",authenticateToken, getAllOffres)
  .get("/enchere/:id",authenticateToken, getOffresByEnchereId)
  .get("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'),authenticateToken, getOffreById)
  .post("/:id", validateOffre, authenticateToken,createOffre)
  .put("/:id", [
    param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'),
    ...validateOffre,
  ], authenticateToken,updateOffre)
  .delete("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'), authenticateToken,deleteOffre);

export default offre;
