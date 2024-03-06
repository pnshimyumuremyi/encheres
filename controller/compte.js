import { Compte } from "../model/relations.js";
import { validationResult } from 'express-validator';

// Récupérer tous les comptes
export const getAllComptes = async (req, res) => {
    try {
        const comptes = await Compte.findAll();
        res.status(200).json({ data: comptes, message: "Liste des comptes récupérée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des comptes", error: error.message });
    }
};

// Créer un nouveau compte
export const createCompte = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { solde, utilisateurId } = req.body;
        const nouveauCompte = await Compte.create({ solde, id_utilisateur: utilisateurId });
        res.status(201).json({ data: nouveauCompte, message: "Compte créé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la création du compte", error: error.message });
    }
};

// Récupérer un compte par son ID
export const getCompteById = async (req, res) => {
    const { id } = req.params;

    try {
        const compte = await Compte.findByPk(id);
        if (compte) {
            res.status(200).json({ data: compte, message: 'Compte trouvé' });
        } else {
            res.status(404).json({ message: 'Compte non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du compte', error: error.message });
    }
};

// Mettre à jour un compte existant
export const updateCompte = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { solde, utilisateurId } = req.body;
        const compte = await Compte.findByPk(id);
        if (!compte) {
            return res.status(404).json({ message: "Compte non trouvé" });
        }
        compte.solde = solde;
        compte.id_utilisateur = utilisateurId;
        await compte.save();
        res.status(200).json({ data: compte, message: "Compte mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du compte", error: error.message });
    }
};

// Supprimer un compte
export const deleteCompte = async (req, res) => {
    try {
        const { id } = req.params;
        const compte = await Compte.findByPk(id);
        if (!compte) {
            return res.status(404).json({ message: "Compte non trouvé" });
        }
        await compte.destroy();
        res.status(200).json({ message: "Compte supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du compte", error: error.message });
    }
};
