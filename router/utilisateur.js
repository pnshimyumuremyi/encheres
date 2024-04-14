import { Router } from "express";
import { body, param, validationResult } from 'express-validator';
import { getAllUtilisateurs, getUtilisateurById, createUtilisateur, updateUtilisateur, deleteUtilisateur, loginUtilisateur } from "../controller/utilisateur.js";
import { authenticateToken } from "../model/auth.js";
import { isAdmin, verifierToken } from "../controller/authorisations.js";

const utilisateur = Router();

const validateUtilisateur = [
  body('nom').notEmpty().withMessage('Le nom est obligatoire'),
  body('prenom').notEmpty().withMessage('Le prénom est obligatoire'),
  body('email').isEmail().withMessage('Veuillez fournir une adresse e-mail valide'),
  body('mot_de_passe').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('roleId').notEmpty().withMessage('Le rôle est obligatoire'),
];

utilisateur
  .get("/",authenticateToken, getAllUtilisateurs)
  .get("/:id", authenticateToken,getUtilisateurById)
  .post("/",authenticateToken, createUtilisateur)
  .post("/login", validateUtilisateur,  loginUtilisateur)
  .put("/:id", authenticateToken,updateUtilisateur)
  .delete("/:id", authenticateToken,deleteUtilisateur);

export default utilisateur;
