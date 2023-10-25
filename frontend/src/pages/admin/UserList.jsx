import React from 'react';
import AdminNav from '../../components/admin/AdminNav';
import UserTable from '../../components/admin/UserTable';

const UserList = () => (
  <div className="bg-gray-50 h-screen">
    <AdminNav />
    <UserTable />
  </div>
);

export default UserList;
