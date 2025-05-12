import React, { useState } from "react";
import { TextField, Button, Alert, Box } from "@mui/material";
import { updateUserRole } from "../utils/admin";

const UpdateUserRole = () => {
  const [userId, setUserId] = useState("");
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    setError(null);
    setMessage(null);

    try {
      await updateUserRole(userId, newRole);
      setMessage("User role updated successfully!");
    } catch (err) {
      setError("Error updating user role. Please check the console for more details.");
    }
  };

  return (
    <Box sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: "4px" }}>
      <TextField
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New Role"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 1 }}>
        Update Role
      </Button>
      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default UpdateUserRole;