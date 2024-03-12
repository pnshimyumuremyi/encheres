import { Router } from "express";
import { body, param, validationResult } from 'express-validator';
import { getAllUtilisateurs, getUtilisateurById, createUtilisateur, updateUtilisateur, deleteUtilisateur, loginUtilisateur } from "../controller/utilisateur.js";
import { authenticateToken } from "../model/auth.js";

const utilisateur = Router();

const validateUtilisateur = [
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
  body('prenom').notEmpty().withMessage('Le prénom est obligatoire'),
  body('email').isEmail().withMessage('Veuillez fournir une adresse e-mail valide'),
  body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('roleId').notEmpty().withMessage('Le rôle est obligatoire'),
];

utilisateur
  .get("/", authenticateToken, getAllUtilisateurs)
  .get("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'), authenticateToken,  getUtilisateurById)
  .post("/", validateUtilisateur, authenticateToken, createUtilisateur)
  .post("/login", validateUtilisateur,  loginUtilisateur)
  .put("/:id", [
    param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'),
    ...validateUtilisateur,
  ],
  authenticateToken, updateUtilisateur)
  .delete("/:id", param('id').isNumeric().withMessage('L\'ID doit être un ObjectId valide'), authenticateToken, deleteUtilisateur);

export default utilisateur;
