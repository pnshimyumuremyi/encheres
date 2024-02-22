import { connection } from "./connexion.js";

class Utilisateur {
  static selectUtilisateurs() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM utilisateur", (error, results, fields) => {
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

  static insertUtilisateur(nom, prenom, email, mot_de_passe, id_role) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, id_role) VALUES (?, ?, ?, ?, ?)";
      const values = [nom, prenom, email, mot_de_passe, id_role];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Inserted user with ID:", results.insertId);
          resolve(results);
        }
      });
    });
  }

  static updateUtilisateur(id_utilisateur, nom, prenom, email, mot_de_passe, id_role) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE utilisateur SET nom = ?, prenom = ?, email = ?, mot_de_passe = ?, id_role = ? WHERE id_utilisateur = ?";
      const values = [nom, prenom, email, mot_de_passe, id_role, id_utilisateur];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Updated user with ID:", id_utilisateur);
          resolve(results);
        }
      });
    });
  }

  static deleteUtilisateur(id_utilisateur) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM utilisateur WHERE id_utilisateur = ?";
      const values = [id_utilisateur];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Deleted user with ID:", id_utilisateur);
          resolve(results);
        }
      });
    });
  }

  static getUtilisateurById(id_utilisateur) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM utilisateur WHERE id_utilisateur=?", [id_utilisateur], (error, results, fields) => {
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

export { Utilisateur };