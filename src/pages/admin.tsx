import React from 'react';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link href="/admin/users">Manage Users</Link></li>
          <li><Link href="/admin/products">Manage Products</Link></li>
          <li><Link href="/admin/orders">Manage Orders</Link></li>
          <li><Link href="/admin/analytics">Analytics</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;