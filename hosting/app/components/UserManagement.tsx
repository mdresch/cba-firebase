'use client'
import React, { useEffect, useState } from 'react';
import UpdateUserRole from './UpdateUserRole';
import { listAllUsers } from '../admin/userActions';
import { User } from '@/app/utils/types';

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
    <>
      <h2>User Management</h2>
      {users.map(user => (
        <div key={user.uid} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <p>Name: {user.displayName || 'N/A'}</p>
          <p>Email: {user.email}</p>
          <p>Current Role: {user.role || 'user'}</p>
          <UpdateUserRole user={user} onRoleUpdated={handleRoleUpdated} />
        </div>
      ))}
    </>
  );
};

export default UserManagement;