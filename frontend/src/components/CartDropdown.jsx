import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// import cá nhân
import { useAuth } from '../context/authContext';
import { useCart } from '../context/CartContext';

function CartDropdown(props) {
  const { isCartOpen, setIsCartOpen } = props;
  const cartRef = useRef(null);
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const {
    cart,
    setCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  // đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        !document.getElementById('cart-button').contains(event.target)
      ) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // xử lý khi click nút checkout
  const handleCheckout = async () => {
    // gọi api kiểm tra token còn hạn không
    if (!token) {
      alert('ログインしてください');
      navigate('/checkout');
      setIsCartOpen(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/test-token`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        // token hết hạn
        alert('ログインの有効期限が切れました。再度ログインしてください。');
        logout();
        navigate('/checkout');
        setIsCartOpen(false);
        return;
      }

      // token hợp lệ, chuyển đến trang checkout
      navigate('/checkout');
      setIsCartOpen(false);
    } catch (error) {
      console.error('Error checking token:', error);
      alert('サーバーエラーが発生しました。後でもう一度お試しください。');
      return;
    }
  };

  return (
    <div
      ref={cartRef}
      className='absolute top-12 right-0 z-10 max-h-[500px] w-100 overflow-y-auto rounded-b-xs bg-white px-4 pb-3 text-gray-800 shadow-md'
    >
      <div className='flex items-center justify-between border-b border-gray-400 py-2'>
        <h1 className='text-xl font-semibold'>
          カート({cart.reduce((total, item) => total + item.quantity, 0)})
        </h1>
        <button
          className='cursor-pointer p-1 text-xl'
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      {/* list sản phẩm trong cart */}
      <ul>
        {cart.length === 0 && (
          <p className='py-8 text-center font-semibold'>
            カート商品がございません。
          </p>
        )}

        {cart.map((item, index) => {
          return (
            <li key={item._id} className='my-3'>
              <div className='flex gap-2'>
                <img width={100} src={item.images[0]} alt='' />
                <p className=''>{item.name}</p>
              </div>
              <div className='mt-1 flex items-end justify-between'>
                <div className='flex items-center gap-4'>
                  <div className='flex items-center gap-4 border border-gray-200 px-2'>
                    <button
                      className='cursor-pointer p-1 text-xl'
                      onClick={() => decrementQuantity(item._id)}
                    >
                      -
                    </button>
                    <span className='text-xl font-semibold'>
                      {item.quantity}
                    </span>
                    <button
                      className='cursor-pointer p-1 text-xl'
                      onClick={() => incrementQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className='cursor-pointer p-1 text-red-500'
                    onClick={() => removeFromCart(item._id)} // thay 'productId' bằng actual product ID
                  >
                    削除
                  </button>
                </div>
                <span>¥{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className='border-t border-gray-400 py-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold'>小計</h1>
          <span className='text-xl font-semibold'>
            ¥
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()}
          </span>
        </div>
        <p className='my-2'>
          送料と割引コードはチェックアウト時に計算されます。
        </p>
        <button
          className='w-full cursor-pointer rounded-sm bg-[var(--color-primary)] p-2 text-xl text-white'
          onClick={handleCheckout}
        >
          チェックアウト
        </button>
      </div>
    </div>
  );
}

export default CartDropdown;
