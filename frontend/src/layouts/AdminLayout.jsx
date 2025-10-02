import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div>
      <h1 className='bg-red-400 text-2xl font-bold'>
        Admin ダッシュボード, 管理ページ、準備中
      </h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
