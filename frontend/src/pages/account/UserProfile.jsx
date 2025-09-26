import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // xử lý khí bấm logout
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  };

  if (!user) return null;

  return (
    <div>
      <h1 className='text-2xl font-bold'>
        Trang UserProfile của{' '}
        <span className='text-rose-500'>
          {user ? user.firstName : 'unknown user'}
        </span>{' '}
        với id là{' '}
        <span className='text-red-500'>{user ? user.id : 'unknown id'}</span>
        để người dùng xem đơn hàng và chỉnh sửa thông tin cá nhân
      </h1>
      <button
        className='rounded bg-red-500 px-4 py-2 text-white'
        onClick={handleLogout}
      >
        ログアウト
      </button>
    </div>
  );
}

export default UserProfile;
