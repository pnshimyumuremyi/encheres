import { Utilisateur } from "../model/relations.js";
import { validationResult } from 'express-validator';
import { generateToken } from "../model/auth.js";

// Récupérer tous les utilisateurs
export const getAllUtilisateurs = async (req, res) => {
    try {
        const tousLesUtilisateurs = await Utilisateur.findAll();
        res.status(200).json({ data: tousLesUtilisateurs, message: 'Liste des utilisateurs récupérée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs', error: error.message });
    }
};

// Créer un nouvel utilisateur
export const createUtilisateur = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const nouvelUtilisateur = await Utilisateur.create(req.body);
        res.status(201).json({ data: nouvelUtilisateur, message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur', error: error.message });
    }
};

// Récupérer un utilisateur par son ID
export const getUtilisateurById = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);
        if (utilisateur) {
            res.status(200).json({ data: utilisateur, message: 'Utilisateur trouvé' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur', error: error.message });
    }
};

// Mettre à jour un utilisateur
export const updateUtilisateur = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);
        if (utilisateur) {
            await utilisateur.update(req.body);
            res.status(200).json({ data: utilisateur, message: 'Utilisateur mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur', error: error.message });
    }
};

// Supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);
        if (utilisateur) {
            await utilisateur.destroy();
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de l\'utilisateur', error: error.message });
    }
};

export const loginUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findOne({
            where: { email: req.body.email },
        });

        if (utilisateur) {
            // Check if the provided password matches the stored password hash
            if (utilisateur.mot_de_passe === req.body.mot_de_passe) {
                
                res.status(200).json({ token: generateToken(utilisateur), message: 'Connexion réussie' });
            } else {
                // Passwords do not match - unsuccessful login
                res.status(401).json({ message: 'Mot de passe incorrect' });
            }
        } else {
            // User not found - unsuccessful login
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'utilisateur', error: error.message });
    }
};
