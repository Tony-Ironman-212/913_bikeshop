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
    <div className='my-10 text-center'>
      <h1 className='text-2xl font-bold'>
        ユーザープロファイルページ - 準備中
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
