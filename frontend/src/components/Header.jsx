import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faXmark,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

// import cá nhân
import CartDropdown from './CartDropdown';

function Header() {
  const [inputValue, setInputValue] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const [isHistoryShown, setIsHistoryShown] = useState(false);
  const [isCartShown, setIsCartShown] = useState(false);
  const inputElement = useRef(null);
  const navigate = useNavigate();

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
    navigate(`/collections/search?query=${encodeURIComponent(inputValue)}`);
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
    navigate('/account/login');
    setInputValue('');
  };
  return (
    <header>
      <div className='bg-black text-white'>
        <div className='mx-auto flex max-w-[1500px] justify-between gap-10 px-10 py-10'>
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
            <span className='mr-1 hidden'>Tony212</span>
            <div className='flex items-center gap-4'>
              <button
                className='cursor-pointer p-1 text-2xl'
                onClick={handleLoginClick}
              >
                <FontAwesomeIcon icon={faCircleUser} />
              </button>
              <div className='relative'>
                <button
                  id='cart-button'
                  className='cursor-pointer p-1 text-2xl'
                  onClick={() => {
                    setIsCartShown(!isCartShown);
                  }}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
                {isCartShown && (
                  <CartDropdown
                    isCartShown={isCartShown}
                    setIsCartShown={setIsCartShown}
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

export default Header;
