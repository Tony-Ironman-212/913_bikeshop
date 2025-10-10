import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCircleUser,
  faCartShopping,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

function AdminLayout() {
  const [inputValue, setInputValue] = useState('');
  const inputElement = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // tạo biến chứa dữ liệu mấy nút sidebar
  const sidebarItems = [
    { name: 'オーダー管理', path: '/account/admin/orders' },
    { name: '商品管理', path: '/account/admin/products' },
    { name: 'ユーザー管理', path: '/account/admin/users' },
    { name: 'お問い合わせ管理', path: '/account/admin/contacts' },
    { name: 'IMG&商品アップロード', path: '/account/admin/images-upload' },
  ];

  // xử lý khí bấm logout
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  };

  // xử lý search khi admin tìm kiếm 1 sản phẩm hay 1 đơn hàng nào đó...
  const handleSearch = (e) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (query) {
      navigate(`/account/admin/search?query=${query}`, { replace: true });
    }
  };

  return (
    <div>
      <header>
        <div className='bg-black text-white'>
          <div className='relative mx-auto max-w-[1500px] justify-between gap-10 p-3 lg:flex lg:px-10 lg:py-6'>
            <Link
              className='block w-[250px] lg:w-[350px]'
              onClick={() => setInputValue('')}
              to='/'
            >
              <img
                className='h-full w-full'
                src='/img/specialized_logo.png'
                alt=''
              />
            </Link>
            <div className='relative mt-2 flex flex-1 items-center rounded-lg bg-white px-4 text-gray-800 lg:mt-0'>
              <span
                className='cursor-pointer border-r border-gray-400 pr-4 text-2xl text-gray-600'
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <form className='flex-1' onSubmit={handleSearch}>
                <input
                  className='mx-2 w-full py-1 text-lg outline-none'
                  placeholder='検索'
                  type='text'
                  value={inputValue}
                  ref={inputElement}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </form>
              <button
                className='cursor-pointer p-1 text-2xl text-gray-600'
                onClick={() => setInputValue('')}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <div className='absolute top-2 right-4 flex items-center text-white lg:static lg:top-auto lg:right-auto'>
              <span className='mr-1 max-lg:hidden'>
                Admin {user?.firstName}
              </span>
              <div className='relative'>
                <span className='cursor-pointer p-1 text-2xl'>
                  <FontAwesomeIcon icon={faCircleUser} />
                </span>
                <span className='absolute top-[6px] right-[6px] block h-[10px] w-[10px] rounded-[50%] bg-green-400'></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* top bar */}
      <div className='mx-auto mt-4 flex max-w-[1500px] flex-col gap-4 px-3 lg:px-5'>
        <div className='p-4'>
          <div className='mb-4 flex items-center justify-between pb-2'>
            <h2 className='mb-4 text-xl font-semibold'>Admin ダッシュボード</h2>
            <button
              className='rounded-md bg-red-500 px-4 py-2 text-white'
              onClick={handleLogout}
            >
              ログアウト
            </button>
          </div>
          <ul className='flex flex-col lg:flex-row lg:space-x-10'>
            {sidebarItems.map((item, index) => (
              <li className='text-lg font-medium' key={index}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
