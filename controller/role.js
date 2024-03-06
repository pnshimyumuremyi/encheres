import { validationResult } from 'express-validator';
import { Role } from "../model/relations.js";

// Get all roles
export const roleList = async (req, res) => {
  try {
    const allRoles = await Role.findAll();
    res.status(200).json({ data: allRoles, message: "Successfully retrieved all roles." });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve roles.", error: error.message });
  }
};

// Get a single role by ID
export const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
    res.status(200).json({ data: role, message: "Successfully retrieved role." });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve role.", error: error.message });
  }
};

// Create a new role
export const createRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nom_role } = req.body;

  try {
    const newRole = await Role.create({ nom_role });
    console.log(newRole);
    res.status(201).json({ data: newRole, message: "Role created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to create role.", error: error.message });
  }
};

// Update an existing role
export const updateRole = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { nom_role } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
    await role.update({ nom_role });
    res.status(200).json({ data: role, message: "Role updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update role.", error: error.message });
  }
};

// Delete a role
export const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found." });
    }
    await role.destroy();
    res.status(200).json({ message: "Role deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete role.", error: error.message });
  }
};

