import { Router } from "express";
import { body, param, validationResult } from 'express-validator';
import { getAllComptes, getCompteById, createCompte, updateCompte, deleteCompte } from "../controller/compte.js";
import { authenticateToken } from "../model/auth.js";

const compte = Router();

const validateCompte = [
  body('solde').isNumeric().withMessage('Le solde doit être un nombre'),
  body('utilisateurId').isNumeric().withMessage('L\'ID de l\'utilisateur doit être un ObjectId valide'),
];

compte
  .get("/",authenticateToken, getAllComptes)
  .get("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'), authenticateToken,getCompteById)
  .post("/", validateCompte, authenticateToken,createCompte)
  .put("/:id", [
    param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'),
    ...validateCompte,
  ],authenticateToken, updateCompte)
  .delete("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'),authenticateToken, deleteCompte);

export default compte;
