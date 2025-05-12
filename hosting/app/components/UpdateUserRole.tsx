"use client";
import React, { useState } from 'react';
import { updateUserRole } from '../admin/userActions';

interface User {
  uid: string;
  role: string; // Assuming role is a string, adjust if it's a specific enum or union type
  // Add other user properties if needed
}

interface UpdateUserRoleProps {
  user: User;
  onRoleUpdated: (uid: string, newRole: string) => void;
}

const UpdateUserRole: React.FC<UpdateUserRoleProps> = ({ user, onRoleUpdated }) => {
  const [newRole, setNewRole] = useState<string>(user.role);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = async () => {
    setLoading(true);
    setError(null);
    try {
      await updateUserRole(user.uid, newRole);
      onRoleUpdated(user.uid, newRole);
    } catch (err: any) { // Catching as any to handle potential different error types
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <select value={newRole} onChange={(e) => setNewRole(e.target.value)} disabled={loading}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRoleChange} disabled={loading}>
        {loading ? 'Updating...' : 'Update Role'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateUserRole;