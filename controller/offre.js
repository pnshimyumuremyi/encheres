import { Offre } from "../model/relations.js";
import { validationResult } from 'express-validator';

// Récupérer toutes les offres
export const getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.findAll();
    res.status(200).json({ data: offres, message: 'Liste des offres récupérée avec succès' });
  } catch (error) {
    res.status(404).json({ message: 'Une erreur est survenue lors de la récupération des offres', error: error.message });
  }
};

// Récupérer une offre par son ID
export const getOffreById = async (req, res) => {
  const { id } = req.params;

  try {
    const offre = await Offre.findByPk(id);
    if (offre) {
      res.status(200).json({ data: offre, message: 'Offre trouvée' });
    } else {
      res.status(404).json({ message: 'Offre non trouvée' });
    }
  } catch (error) {
    res.status(404).json({ message: 'Une erreur est survenue lors de la récupération de l\'offre', error: error.message });
  }
};

// Créer une nouvelle offre
export const createOffre = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const offre = req.body;

  try {
    const newOffre = await Offre.create(offre);
    res.status(201).json({ data: newOffre, message: 'Offre créée avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Une erreur est survenue lors de la création de l\'offre', error: error.message });
  }
};

// Mettre à jour une offre
export const updateOffre = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const offre = req.body;

  try {
    const updatedOffre = await Offre.findByPk(id);
    if (updatedOffre) {
      await updatedOffre.update(offre);
      res.status(200).json({ data: updatedOffre, message: 'Offre mise à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Offre non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'offre', error: error.message });
  }
};

// Supprimer une offre
export const deleteOffre = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOffre = await Offre.findByPk(id);
    if (deletedOffre) {
      await deletedOffre.destroy();
      res.status(200).json({ message: 'Offre supprimée avec succès' });
    } else {
      res.status(404).json({ message: 'Offre non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Une erreur est survenue lors de la suppression de l\'offre', error: error.message });
  }
};
