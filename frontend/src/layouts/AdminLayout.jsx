import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div>
      <h1 className='text-2xl font-bold bg-red-400'>
        Admin Panel, trang quản lý của admin
      </h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
