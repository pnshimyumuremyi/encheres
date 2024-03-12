import { Router } from "express";
import { body, param } from 'express-validator';
import { getAllEncheres, getEnchereById, createEnchere, updateEnchere, deleteEnchere } from "../controller/enchere.js";

const enchere = Router();

const validateEnchere = [
  body('titre').notEmpty().withMessage('Le titre est obligatoire'),
  body('description').notEmpty().withMessage('La description est obligatoire'),
  body('prix_depart').isNumeric().withMessage('Le prix de départ doit être un nombre'),
  body('date_debut').isISO8601().toDate().withMessage('La date de début doit être une date au format ISO8601'),
  body('date_fin').isISO8601().toDate().withMessage('La date de fin doit être une date au format ISO8601'),
  body('utilisateurId').notEmpty().withMessage('L\'ID de l\'utilisateur est obligatoire'),
];

enchere
  .get("/", getAllEncheres)
  .get("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'), getEnchereById)
  .post("/", validateEnchere, createEnchere)
  .put("/:id", [
    param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'),
    ...validateEnchere,
  ], updateEnchere)
  .delete("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'), deleteEnchere);

export default enchere;
