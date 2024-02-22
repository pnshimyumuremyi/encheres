import { Enchere } from "../models/enchere.js";

class EnchereController {
  static async getEncheres(request, response) {
    try {
      const encheres = await Enchere.selectEncheres();
      response.status(200).json(encheres);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting encheres.");
    }
  }

  static async createEnchere(request, response) {
    console.log(request.body);
    const { titre, description, prix_depart, date_debut, date_fin, id_utilisateur } = request.body;

    try {
      const result = await Enchere.insertEnchere(titre, description, prix_depart, date_debut, date_fin, id_utilisateur);
      response.status(201).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error creating enchere.");
    }
  }

  static async updateEnchere(request, response) {
    const { id_enchere } = request.params;
    const { titre, description, prix_depart, date_debut, date_fin, id_utilisateur } = request.body;

    try {
      const result = await Enchere.updateEnchere(id_enchere, titre, description, prix_depart, date_debut, date_fin, id_utilisateur);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error updating enchere.");
    }
  }

  static async deleteEnchere(request, response) {
    const { id_enchere } = request.params;

    try {
      const result = await Enchere.deleteEnchere(id_enchere);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error deleting enchere.");
    }
  }

  static async getEnchereById(request, response) {
    const { id_enchere } = request.params;

    try {
      const enchere = await Enchere.getEnchereById(id_enchere);
      response.status(200).json(enchere);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting enchere by ID.");
    }
  }
}

export { EnchereController };
