import { Enchere } from "../model/relations.js";
import { validationResult } from 'express-validator';

// Récupérer toutes les enchères
export const getAllEncheres = async (req, res) => {
    try {
        const encheres = await Enchere.findAll();
        res.status(200).json({ data: encheres, message: "Liste des enchères récupérée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des enchères", error: error.message });
    }
};

// Créer une nouvelle enchère
export const createEnchere = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { titre, description, prix_depart, date_debut, date_fin, utilisateurId } = req.body;
        const nouvelleEnchere = await Enchere.create({ titre, description, prix_depart, date_debut, date_fin, utilisateurId });
        res.status(201).json({ data: nouvelleEnchere, message: "Enchère créée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'enchère", error: error.message });
    }
};

// Récupérer une enchère par son ID
export const getEnchereById = async (req, res) => {
    const { id } = req.params;

    try {
        const enchere = await Enchere.findByPk(id);
        if (enchere) {
            res.status(200).json({ data: enchere, message: 'Enchère trouvée' });
        } else {
            res.status(404).json({ message: 'Enchère non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'enchère', error: error.message });
    }
};

// Mettre à jour une enchère existante
export const updateEnchere = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { titre, description, prix_depart, date_debut, date_fin, utilisateurId } = req.body;
        const enchere = await Enchere.findByPk(id);
        if (!enchere) {
            return res.status(404).json({ message: "Enchère non trouvée" });
        }
        enchere.titre = titre;
        enchere.description = description;
        enchere.prix_depart = prix_depart;
        enchere.date_debut = date_debut;
        enchere.date_fin = date_fin;
        enchere.utilisateurId = utilisateurId;
        await enchere.save();
        res.status(200).json({ data: enchere, message: "Enchère mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de l'enchère", error: error.message });
    }
};

// Supprimer une enchère
export const deleteEnchere = async (req, res) => {
    try {
        const { id } = req.params;
        const enchere = await Enchere.findByPk(id);
        if (!enchere) {
            return res.status(404).json({ message: "Enchère non trouvée" });
        }
        await enchere.destroy();
        res.status(200).json({ message: "Enchère supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'enchère", error: error.message });
    }
};
