import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { updateUserRole } from "../utils/admin";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  // Fetch users from Firestore in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle role updates directly from the user list
  const handleRoleChange = async (userId, e) => {
    const newRole = e.target.value;
    try {
      await updateUserRole(userId, newRole);
      // Optionally, display success feedback here; onSnapshot updates should handle UI change after role update.
    } catch (error) {
      console.error("Error updating role for user ", userId, error);
    }
  };

  // Filtering logic: filter by search query and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 1 }}>
          Loading users...

        </Typography>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search by Email"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          variant="outlined"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All Roles</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          {/* Add additional roles here if needed */}
        </Select>
      </Box>
      <TableContainer component={Paper}>

      <Table aria-label="User Management Table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Current Role</TableCell>
            <TableCell>Update Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  {/* Add additional roles here if needed */}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      {filteredUsers.length === 0 && (
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          No users found matching the criteria.
        </Typography>
      )}
    </Box>
  );
};

export default UserManagement;