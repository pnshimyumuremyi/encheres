import { Commentaire } from "../model/relations.js";
import { validationResult } from 'express-validator';

// Récupérer tous les commentaires
export const getAllCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.findAll();
    res.status(200).json({ data: commentaires, message: 'Liste des commentaires récupérée avec succès' });
  } catch (error) {
    res.status(404).json({ message: 'Une erreur est survenue lors de la récupération des commentaires', error: error.message });
  }
};

// Récupérer un commentaire par son ID
export const getCommentaireById = async (req, res) => {
  const { id } = req.params;

  try {
    const commentaire = await Commentaire.findByPk(id);
    if (commentaire) {
      res.status(200).json({ data: commentaire, message: 'Commentaire trouvé' });
    } else {
      res.status(404).json({ message: 'Commentaire non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du commentaire', error: error.message });
  }
};

// Créer un nouveau commentaire
export const createCommentaire = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const commentaire = req.body;

  try {
    const newCommentaire = await Commentaire.create(commentaire);
    res.status(201).json({ data: newCommentaire, message: 'Commentaire créé avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Une erreur est survenue lors de la création du commentaire', error: error.message });
  }
};

// Mettre à jour un commentaire
export const updateCommentaire = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const commentaire = req.body;

  try {
    const updatedCommentaire = await Commentaire.findByPk(id);
    if (updatedCommentaire) {
      await updatedCommentaire.update(commentaire);
      res.status(200).json({ data: updatedCommentaire, message: 'Commentaire mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Commentaire non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Une erreur est survenue lors de la mise à jour du commentaire', error: error.message });
  }
};

// Supprimer un commentaire
export const deleteCommentaire = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCommentaire = await Commentaire.findByPk(id);
    if (deletedCommentaire) {
      await deletedCommentaire.destroy();
      res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Commentaire non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Une erreur est survenue lors de la suppression du commentaire', error: error.message });
  }
};
