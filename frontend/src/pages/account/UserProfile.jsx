import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  // call api lấy thông đơn hàng để làm lịch sử mua hàng
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders/me`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // token lấy khi login
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  // xử lý khí bấm logout
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 0);
  };

  // xử lý khi bấm nút update
  const handleNavigateUpdate = () => {
    navigate(`/account/user/update/${user._id}`);
  };

  if (!user) return null;

  return (
    <div className='mx-auto my-10 max-w-[1500px] px-3 lg:px-5'>
      <h1 className='text-center text-3xl font-bold'>マイページ</h1>
      <div className='my-5 flex max-w-[600px] flex-col gap-2 text-lg'>
        <h2 className='font-semibold'>会員情報</h2>
        <p>
          名前：{user.firstName} {user.lastName}
        </p>
        <p>メールアドレス：{user.email}</p>
        <p>電話番号：{user.phone ? user.phone : '未設定'}</p>
        <p>郵便番号：{user.zipCode ? user.zipCode : '未設定'}</p>
        <p>
          住所：
          {user.address ? user.address : '未設定'}
        </p>
        <button
          className='rounded bg-[var(--color-primary)] px-4 py-2 text-white'
          onClick={handleNavigateUpdate}
        >
          会員情報更新
        </button>
        <button
          className='rounded bg-red-500 px-4 py-2 text-white'
          onClick={handleLogout}
        >
          ログアウト
        </button>
      </div>
      <div className='my-10 flex flex-col gap-2'>
        <h2 className='text-center text-xl font-bold'>購入履歴</h2>
        {/* max-lg hiển thị dạng table 2 cột thôi */}
        <div className='space-y-4 lg:hidden'>
          {orders.map((order) => {
            return (
              <table
                key={order._id}
                className='w-full table-auto odd:bg-white even:bg-gray-100'
              >
                <tbody>
                  <tr>
                    <td className='w-[90px]'>Order ID</td>
                    <td>{order._id}</td>
                  </tr>
                  <tr>
                    <td>購入日</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>商品名</td>
                    <td>
                      {order.items.map((item) => {
                        return (
                          <p key={item._id}>
                            {item.name} x {item.quantity}
                          </p>
                        );
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>発送状況</td>
                    <td>
                      {order.shippingStatus === 'Processing'
                        ? '処理中'
                        : '発送済み'}
                    </td>
                  </tr>
                  <tr>
                    <td>価格</td>
                    <td>¥{order.totalAmount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>

        {/* lg hiển thị dạng bảng */}
        <table className='max-lg:hidden'>
          <thead className='border-b-2 text-left'>
            <tr>
              <th>Order ID</th>
              <th>購入日</th>
              <th>商品名</th>
              <th>数量</th>
              <th>発送状況</th>
              <th>価格</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr className='odd:bg-white even:bg-gray-100' key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    {order.items.map((item) => {
                      return <p key={item._id}>{item.name}</p>;
                    })}
                  </td>
                  <td>
                    {order.items.map((item) => {
                      return <p key={item._id}>{item.quantity}</p>;
                    })}
                  </td>
                  <td>
                    {order.shippingStatus === 'Processing'
                      ? '処理中'
                      : '発送済み'}
                  </td>
                  <td>¥{order.totalAmount.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserProfile;
