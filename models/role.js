import { connection } from "./connexion.js";
 
class Role {
  static selectRoles() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM role", (error, results, fields) => {
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
 
  static insertRole(nom_role) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO role (nom_role) VALUES (?)";
      const values = [nom_role];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Inserted role with ID:", results.insertId);
          resolve(results);
        }
      });
    });
  }
 
  static updateRole(id_role, nom_role) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE role SET nom_role = ? WHERE id_role = ?";
      const values = [nom_role, id_role];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Updated role with ID:", id_role);
          resolve(results);
        }
      });
    });
  }
 
  static deleteRole(id_role) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM role WHERE id_role = ?";
      const values = [id_role];
      connection.query(query, values, (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          reject(error);
        } else {
          console.log("Deleted role with ID:", id_role);
          resolve(results);
        }
      });
    });
  }
 
  static getRoleById(id_role) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM role WHERE id_role=?", [id_role], (error, results, fields) => {
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
 
export { Role };