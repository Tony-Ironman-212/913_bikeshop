import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';

function Products() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // xử lý khí bấm logout
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold'>Trang Products để quản lý sản phẩm</h1>
      <button
        className='rounded bg-red-500 px-4 py-2 text-white'
        onClick={handleLogout}
      >
        ログアウト
      </button>
    </div>
  );
}

export default Products;
