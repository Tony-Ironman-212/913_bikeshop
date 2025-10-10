import { Route, Navigate, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// User pages
import Login from '../pages/account/Login';
import Register from '../pages/account/Register';
import UserProfile from '../pages/account/UserProfile';
import UserUpdate from '../pages/account/UserUpdate';

// admin pages
import Products from '../pages/account/admin/Products';
import Users from '../pages/account/admin/Users';
import Orders from '../pages/account/admin/Orders';
import Contacts from '../pages/account/admin/Contacts';
import OneProduct from '../pages/account/admin/OneProduct';
import OneUser from '../pages/account/admin/OneUser';
import OneOrder from '../pages/account/admin/OneOrder';
import OneContact from '../pages/account/admin/OneContact';
import ImagesUpload from '../pages/account/admin/ImgsUpload';

// context và utils
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
        <Route
          path='account/user/update/:id'
          element={
            <PrivateRoute>
              <UserUpdate />
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
          path='products/:id'
          element={
            <PrivateRoute>
              <OneProduct />
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
          path='users/:id'
          element={
            <PrivateRoute>
              <OneUser />
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
        <Route
          path='orders/:id'
          element={
            <PrivateRoute>
              <OneOrder />
            </PrivateRoute>
          }
        />
        <Route
          path='contacts'
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path='contacts/:id'
          element={
            <PrivateRoute>
              <OneContact />
            </PrivateRoute>
          }
        />
        <Route
          path='images-upload'
          element={
            <PrivateRoute>
              <ImagesUpload />
            </PrivateRoute>
          }
        />
      </Route>
    </>
  );
}

export default AccountRouter;
