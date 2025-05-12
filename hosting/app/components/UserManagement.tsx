import React, { useEffect, useState } from 'react';
import { listAllUsers } from '../utils/admin';
import UpdateUserRole from './UpdateUserRole';

interface User {
  uid: string;
  displayName: string | null;
  email: string;
  role?: string; // Role is optional, default to 'user' if not present
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList: User[] = await listAllUsers();
        setUsers(usersList);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleUpdated = (uid: string, newRole: string) => {
    setUsers(users.map(user => user.uid === uid ? { ...user, role: newRole } : user));
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>User Management</h2>
      {users.map(user => (
        <div key={user.uid} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <p>Name: {user.displayName || 'N/A'}</p>
          <p>Email: {user.email}</p>
          <p>Current Role: {user.role || 'user'}</p>
          <UpdateUserRole user={user} onRoleUpdated={handleRoleUpdated} />
        </div>
      ))}
    </div>
  );
};

export default UserManagement;