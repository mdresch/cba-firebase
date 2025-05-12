import useRequireAuth from '../utils/useRequireAuth';
import UserManagement from '../components/UserManagement';

const AdminDashboard = () => {
  useRequireAuth('admin');
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Below is the user management interface.</p>
      {/* This component displays the list of users and manages role changes */}
      <UserManagement />
    </div>
  );
};

export default AdminDashboard;