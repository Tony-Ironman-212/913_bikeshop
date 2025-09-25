import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // điều hướng sang login, đồng thời gửi kèm state.from là trang hiện tại
    return <Navigate to='/account/login' state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;
