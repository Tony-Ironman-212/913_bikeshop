import { Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/account/Login';
import Register from '../pages/account/Register';
import UserProfile from '../pages/account/UserProfile';
import Products from '../pages/account/admin/Products';
import Users from '../pages/account/admin/Users';
import Orders from '../pages/account/admin/Orders';
import { useAuth } from '../context/authContext';
import PrivateRoute from '../components/PrivateRoute';

function AccountRouter() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      <Route path='/' element={<MainLayout />}>
        <Route
          path='account/login'
          element={
            // location.state.from = false là truy cập trực tiếp gõ tay url, không phải từ click nút login
            // trường hợp đó thì vào thẳng trang user profile
            user && !location.state?.from ? (
              <Navigate to={`/account/user/${user.id}`} replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path='account/register'
          element={
            user ? (
              <Navigate to={`/account/user/${user.id}`} replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path='account/user/:id'
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path='account/admin/' element={<AdminLayout />}>
        <Route
          path='products'
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path='users'
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path='orders'
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
      </Route>
    </>
  );
}

export default AccountRouter;
