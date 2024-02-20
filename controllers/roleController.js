import { Role } from "../models/role.js";
 
class RoleController {
  static async getRoles(request, response) {
    try {
      const roles = await Role.selectRoles();
      response.status(200).json(roles);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting roles.");
    }
  }
 
  static async createRole(request, response) {
    const { nom_role } = request.body;
 
    try {
      const result = await Role.insertRole(nom_role);
      response.status(201).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error creating role.");
    }
  }
 
  static async updateRole(request, response) {
    const { id_role } = request.params;
    const { nom_role } = request.body;
 
    try {
      const result = await Role.updateRole(id_role, nom_role);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error updating role.");
    }
  }
 
  static async deleteRole(request, response) {
    const { id_role } = request.params;
 
    try {
      const result = await Role.deleteRole(id_role);
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error deleting role.");
    }
  }
 
  static async getRoleById(request, response) {
    const { id_role } = request.params;
 
    try {
      const role = await Role.getRoleById(id_role);
      response.status(200).json(role);
    } catch (error) {
      console.error(error);
      response.status(500).send("Error getting role by ID.");
    }
  }
}
 
export { RoleController };