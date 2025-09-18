import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/account/Login';
import Register from '../pages/account/Register';
import UserProfile from '../pages/account/UserProfile';
import Products from '../pages/account/admin/Products';
import Users from '../pages/account/admin/Users';
import Orders from '../pages/account/admin/Orders';

function AccountRouter() {
  return (
    <>
      <Route path='/' element={<MainLayout />}>
        <Route path='account/login' element={<Login />} />
        <Route path='account/register' element={<Register />} />
        <Route path='account/user/:id' element={<UserProfile />} />
      </Route>
      <Route path='account/admin/' element={<AdminLayout />}>
        <Route path='products' element={<Products />} />
        <Route path='users' element={<Users />} />
        <Route path='orders' element={<Orders />} />
      </Route>
    </>
  );
}

export default AccountRouter;
