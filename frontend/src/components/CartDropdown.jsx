import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function CartDropdown(props) {
  const { isCartShown, setIsCartShown } = props;
  const cartRef = useRef(null);
  const navigate = useNavigate();

  // đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !document.getElementById('cart-button').contains(event.target)
      ) {
        setIsCartShown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={cartRef}
      className='absolute top-12 right-0 z-10 max-h-[500px] w-100 overflow-y-auto rounded-b-xs bg-white px-4 pb-3 text-gray-800 shadow-md'
    >
      <div className='flex items-center justify-between border-b border-gray-400 py-2'>
        <h1 className='text-xl font-semibold'>カート</h1>
        <button
          className='cursor-pointer p-1 text-xl'
          onClick={() => setIsCartShown(!isCartShown)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <ul>
        <p className='hidden'>カート商品がございません。</p>
        <li className='my-3'>
          <div className='flex gap-2'>
            <img width={100} src='/img/cart_img_test.webp' alt='' />
            <p className=''>AETHOS PRO FORCE ETAP AXS 54cm 2022年</p>
          </div>
          <div className='mt-1 flex items-end justify-between'>
            <div className='flex items-center gap-4 border border-gray-200 px-2'>
              <button className='cursor-pointer p-1 text-xl'>-</button>
              <span className='text-xl font-semibold'>1</span>
              <button className='cursor-pointer p-1 text-xl'>+</button>
            </div>
            <span>¥490,000</span>
          </div>
        </li>
        <li className='my-3'>
          <div className='flex gap-2'>
            <img width={100} src='/img/cart_img_test.webp' alt='' />
            <p className=''>AETHOS PRO FORCE ETAP AXS 54cm 2022年</p>
          </div>
          <div className='mt-1 flex items-end justify-between'>
            <div className='flex items-center gap-4 border border-gray-200 px-2'>
              <button className='cursor-pointer p-1 text-xl'>-</button>
              <span className='text-xl font-semibold'>1</span>
              <button className='cursor-pointer p-1 text-xl'>+</button>
            </div>
            <span>¥490,000</span>
          </div>
        </li>
      </ul>
      <div className='border-t border-gray-400 py-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold'>小計</h1>
          <span className='text-xl font-semibold'>¥980,000</span>
        </div>
        <p className='my-2'>
          送料と割引コードはチェックアウト時に計算されます。
        </p>
        <button
          className='w-full cursor-pointer rounded-sm bg-[var(--color-primary)] p-2 text-xl text-white'
          onClick={() => navigate('/checkout')}
        >
          チェックアウト
        </button>
      </div>
    </div>
  );
}

export default CartDropdown;
