import { connection } from "./connexion.js";

class Offre {
  static selectOffres() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM offre", (error, results, fields) => {
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

  static insertOffre(montant, date_offre, id_utilisateur, id_enchere) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO offre (montant, date_offre, id_utilisateur, id_enchere) VALUES (?, ?, ?, ?)";
      const values = [montant, date_offre, id_utilisateur, id_enchere];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Inserted offre with ID:", results.insertId);
          resolve(results);
        }
      });
    });
  }

  static updateOffre(id_offre, montant, date_offre, id_utilisateur, id_enchere) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE offre SET montant = ?, date_offre = ?, id_utilisateur = ?, id_enchere = ? WHERE id_offre = ?";
      const values = [montant, date_offre, id_utilisateur, id_enchere, id_offre];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Updated offre with ID:", id_offre);
          resolve(results);
        }
      });
    });
  }

  static deleteOffre(id_offre) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM offre WHERE id_offre = ?";
      const values = [id_offre];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Deleted offre with ID:", id_offre);
          resolve(results);
        }
      });
    });
  }

  static getOffreById(id_offre) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM offre WHERE id_offre=?", [id_offre], (error, results, fields) => {
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

export { Offre };
