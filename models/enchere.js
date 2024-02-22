import { connection } from "./connexion.js";

class Enchere {
  static selectEncheres() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM enchere", (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Query results:", results);
          resolve(results);
        }
      });
    });
  }

  static insertEnchere(titre, description, prix_depart, date_debut, date_fin, id_utilisateur) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO enchere (titre, description, prix_depart, date_debut, date_fin, id_utilisateur) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [titre, description, prix_depart, date_debut, date_fin, id_utilisateur];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Inserted enchere with ID:", results.insertId);
          resolve(results);
        }
      });
    });
  }

  static updateEnchere(id_enchere, titre, description, prix_depart, date_debut, date_fin, id_utilisateur) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE enchere SET titre = ?, description = ?, prix_depart = ?, date_debut = ?, date_fin = ?, id_utilisateur = ? WHERE id_enchere = ?";
      const values = [titre, description, prix_depart, date_debut, date_fin, id_utilisateur, id_enchere];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Updated enchere with ID:", id_enchere);
          resolve(results);
        }
      });
    });
  }

  static deleteEnchere(id_enchere) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM enchere WHERE id_enchere = ?";
      const values = [id_enchere];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Deleted enchere with ID:", id_enchere);
          resolve(results);
        }
      });
    });
  }

  static getEnchereById(id_enchere) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM enchere WHERE id_enchere=?", [id_enchere], (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Query results:", results);
          resolve(results[0]);
        }
      });
    });
  }
}

export { Enchere };
