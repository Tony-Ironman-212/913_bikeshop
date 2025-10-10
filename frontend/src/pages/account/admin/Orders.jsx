import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // call api lấy danh sách orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // api lấy danh sách orders theo thứ tự mới nhất là /api/orders?sort=newest
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/orders?sort=newest`
        );

        if (!response.ok) {
          throw new Error('ネットワーク応答に問題があります');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className='mb-6 text-center text-2xl font-bold'>注文管理ページ</h1>
      {/* lg hiển thị dạng bảng */}
      <h1 className='mb-4 text-center text-lg font-semibold text-red-600 lg:hidden'>
        パソコン画面にてご確認ください。
      </h1>
      <table className='w-full max-lg:hidden'>
        <thead className='border-b-2 text-left'>
          <tr>
            <th>Order ID</th>
            <th>購入日</th>
            <th>商品名</th>
            <th>数量</th>
            <th>発送状況</th>
            <th>価格</th>
            <th>詳細確認</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr
                className={`${order.isDeleted ? 'text-red-500' : ''} odd:bg-white even:bg-gray-100`}
                key={order._id}
              >
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {order.items.map((item) => {
                    return (
                      <p key={item._id}>
                        {item.name} {order.isDeleted ? '(キャンセル済み)' : ''}
                      </p>
                    );
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
                <td>
                  <button
                    className='text-blue-500'
                    onClick={() =>
                      navigate(`/account/admin/orders/${order._id}`)
                    }
                  >
                    詳細確認
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
