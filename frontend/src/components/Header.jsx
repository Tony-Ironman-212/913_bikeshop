import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faXmark,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

// import cá nhân
import CartDropdown from './CartDropdown';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/CartContext';

function Header() {
  const [inputValue, setInputValue] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const [isHistoryShown, setIsHistoryShown] = useState(false);
  const inputElement = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { cart, isCartOpen, setIsCartOpen } = useCart();

  // load lịch sử từ localStorage khi component mount
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistoryList(storedHistory);
  }, []);

  // xử lý tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // thêm từ khóa mới vào đầu danh sách lịch sử
    const newHistoryList = [
      inputValue,
      ...historyList.filter((item) => item !== inputValue),
    ].slice(0, 5); // giữ tối đa 5 mục
    setHistoryList(newHistoryList);
    localStorage.setItem('searchHistory', JSON.stringify(newHistoryList));
    setInputValue(inputValue);
    setIsHistoryShown(false);
    inputElement.current.blur();
    // chuyển hướng hoặc thực hiện tìm kiếm ở đây
    navigate(`/collections/search?search=${encodeURIComponent(inputValue)}`);
  };

  // xử lý khi chọn một mục từ lịch sử
  const handleSelect = (item) => {
    setInputValue(item);
    setTimeout(() => {
      inputElement.current.focus();
    }, 0);
  };

  // xử lý khi click icon login
  const handleLoginClick = () => {
    if (user) {
      user.isAdmin
        ? navigate('/account/admin/products')
        : navigate(`/account/user/${user.id}`);
    } else {
      navigate('/account/login', { state: { from: location } });
    }
    setInputValue('');
  };
  return (
    <header>
      <div className='bg-black text-white'>
        <div className='mx-auto flex max-w-[1500px] justify-between gap-10 px-2 py-6 lg:px-10'>
          <Link onClick={() => setInputValue('')} to='/'>
            <img width={350} src='/img/specialized_logo.png' alt='' />
          </Link>
          <div className='relative flex flex-1 items-center rounded-lg bg-white px-4 text-gray-800'>
            <span className='border-r border-gray-400 pr-4 text-2xl text-gray-600'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <form className='flex-1' onSubmit={handleSearch}>
              <input
                className='mx-2 w-full py-1 text-lg outline-none'
                placeholder='商品検索'
                type='text'
                value={inputValue}
                ref={inputElement}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsHistoryShown(true)}
                onBlur={() => setIsHistoryShown(false)}
              />
            </form>
            <button
              className='cursor-pointer p-1 text-2xl text-gray-600'
              onClick={() => setInputValue('')}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {/* {history list} */}
            {isHistoryShown && (
              <ul className='absolute top-13 right-1/2 left-15 z-10 bg-white shadow-md'>
                {historyList.map((item, index) => (
                  <li
                    key={index}
                    className='cursor-pointer py-1 pl-5 hover:bg-gray-200'
                    onMouseDown={() => handleSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='flex items-center text-white'>
            {user && <span className='mr-1'>{user.firstName}</span>}
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <button
                  className='cursor-pointer p-1 text-2xl'
                  onClick={handleLoginClick}
                >
                  <FontAwesomeIcon icon={faCircleUser} />
                </button>
                {user && (
                  <span className='absolute top-[6px] right-[6px] block h-[10px] w-[10px] rounded-[50%] bg-green-400'></span>
                )}
              </div>
              <div className='relative'>
                <button
                  id='cart-button'
                  className='cursor-pointer p-1 text-2xl'
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                  }}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
                {cart.length > 0 && (
                  <span className='absolute top-0 right-0 flex size-4 items-center justify-center rounded-sm bg-red-500 text-[10px]'>
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}

                {isCartOpen && (
                  <CartDropdown
                    isCartOpen={isCartOpen}
                    setIsCartOpen={setIsCartOpen}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default React.memo(Header);
