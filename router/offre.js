import { Router } from "express";
import { body, param } from 'express-validator';
import { getAllOffres, getOffreById, createOffre, updateOffre, deleteOffre } from "../controller/offre.js";

const offre = Router();

const validateOffre = [
  body('montant').notEmpty().isNumeric().withMessage('Le montant est obligatoire et doit être un nombre'),
  body('date_offre').isISO8601().toDate().withMessage('La date de l\'offre doit être au format ISO8601'),
  body('utilisateurId').notEmpty().isMongoId().withMessage('L\'ID de l\'utilisateur doit être un ObjectId valide'),
  body('enchereId').notEmpty().isMongoId().withMessage('L\'ID de l\'enchère doit être un ObjectId valide'),
];

offre
  .get("/", getAllOffres)
  .get("/:id", param('id').isMongoId().withMessage('L\'ID doit être un ObjectId valide'), getOffreById)
  .post("/", validateOffre, createOffre)
  .put("/:id", [
    param('id').isMongoId().withMessage('L\'ID doit être un ObjectId valide'),
    ...validateOffre,
  ], updateOffre)
  .delete("/:id", param('id').isMongoId().withMessage('L\'ID doit être un ObjectId valide'), deleteOffre);

export default offre;
