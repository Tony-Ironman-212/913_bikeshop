import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import cá nhân
import AccountInput from '../../../components/AccountInput';
import validateField from '../../../utils/validateField';

function OneOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    method: order?.paymentInfo.method,
    status: order?.paymentInfo.status,
  });
  const [shippingStatus, setShippingStatus] = useState(
    order?.shippingStatus || 'Processing'
  );

  const [fullName, setFullName] = useState(
    order?.shippingAddress.fullName || ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    order?.shippingAddress.phone || ''
  );
  const [zipCode, setZipCode] = useState(order?.shippingAddress.zipCode || '');
  const [address, setAddress] = useState(order?.shippingAddress.address || '');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    lastNameError: '',
    firstNameError: '',
    phoneNumberError: '',
    zipCodeError: '',
    addressError: '',
  });

  // call api lấy 1 order theo id
  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`
      );
      if (!response.ok) {
        throw new Error('ネットワーク応答に問題があります');
      }
      const data = await response.json();
      setOrder(data);
      setPaymentInfo(data.paymentInfo);
      setShippingStatus(data.shippingStatus);
      setFullName(data.shippingAddress.fullName);
      setPhoneNumber(data.shippingAddress.phone);
      setZipCode(data.shippingAddress.zipCode);
      setAddress(data.shippingAddress.address);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // handle chặn phím enter submit keydown enter
  const handleKeyDown = (e) => {
    if (e.target.tagName === 'TEXTAREA') return; // cho phép enter trong textarea
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // handle change cho từng trường
  const handleChange = (field, value, validateField) => {
    switch (field) {
      case 'name':
        setFullName(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'zipCode':
        setZipCode(value);
        break;
      case 'address':
        setAddress(value);
        break;
    }
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [field + 'Error']: validateField(field, value),
    }));
  };

  // handle blur cho từng trường
  const handleBlur = (field, value, validateField) => {
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [field + 'Error']: validateField(field, value),
    }));
  };

  // handle delete order (xóa mềm), đồng thời trả về lại số lượng sản phẩm về lại như trước khi order
  const handleDeleteOrder = async (e) => {
    if (order.isDeleted) {
      e.preventDefault();
      alert('キャンセル済みの注文は更新できません。');
      return;
    }
    if (!window.confirm('本当にこの注文を削除しますか？')) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}/cancel`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: order.items }),
        }
      );
      if (!response.ok) {
        throw new Error('ネットワーク応答に問題があります');
      }
      // Xóa đơn hàng thành công
      alert('注文が削除されました');
      fetchOrder(); // gọi lại để cập nhật giao diện
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // handle submit cập nhật đơn hàng
  const handleSubmitForm = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentInfo,
            shippingAddress: {
              fullName,
              phone: phoneNumber,
              zipCode,
              address,
            },
            shippingStatus,
          }),
        }
      );

      if (!response.ok) {
        alert('更新にエラーが発生しました。もう一度お試しください。');
        return;
      }

      const data = await response.json();
      alert('更新できました。現状の注文情報を確認してください。');
      setOrder(data);
      setIsModalOpen(false);
    } catch (error) {
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    }
  };

  const handleCancelSubmit = (e) => {
    setIsModalOpen(false);
  };

  // xử lý bấm nút cập nhật
  const handleClickUpdate = (e) => {
    if (order.isDeleted) {
      e.preventDefault();
      alert('キャンセル済みの注文は更新できません。');
      return;
    }
    setIsModalOpen(true);
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-center text-2xl font-bold'>一つの注文詳細ページ</h1>
      <div className='mx-auto mt-6 mb-20 max-w-3xl space-y-4 rounded p-6'>
        {/* mã đơn hàng */}
        <p>注文ID: {order._id}</p>

        {/* trạng thái đơn hàng */}
        <p className='text-xl font-bold text-red-500'>
          {order.isDeleted ? '(キャンセル済み)' : ''}
        </p>

        {/* ngày đặt hàng */}
        <p>注文日: {new Date(order.createdAt).toLocaleString()}</p>

        {/* thông tin người mua */}
        <div>
          <p>購入者について</p>
          <p>名前: {`${order.user.lastName} ${order.user.firstName}`}</p>
          <p>メール: {order.user.email}</p>
        </div>

        {/* thông tin đơn hàng */}
        <div>
          <p>注文情報について</p>
          {order.items.map((item, index) => {
            return (
              <p key={index}>
                {index + 1}. 商品名: {item.name} / 数量: {item.quantity} / 価格:{' '}
                {(item.price * item.quantity).toLocaleString()}円
              </p>
            );
          })}
        </div>

        {/* tổng tiền đơn hàng */}
        <p>合計金額: {order.totalAmount.toLocaleString()}円</p>

        {/* thông tin thanh toán */}
        <div>
          <p>支払い情報について</p>
          <p>支払い方法: {order.paymentInfo.method}</p>
          <fieldset>
            <label htmlFor='payment-status'>支払い状況:</label>
            <select
              className='ml-2 rounded border'
              name='payment-status'
              id='payment-status'
              value={paymentInfo.status}
              onChange={(e) =>
                setPaymentInfo({ ...paymentInfo, status: e.target.value })
              }
            >
              <option value='Pending'>未払い</option>
              <option value='Completed'>完了</option>
              <option value='Failed'>失敗</option>
            </select>
          </fieldset>
        </div>

        {/* thông tin giao hàng */}
        <div>
          <form
            action='#'
            method='POST'
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <h1 className='text-center text-2xl font-bold'>配送先</h1>
            <AccountInput
              label='名前'
              type='text'
              id='name'
              placeholder='田中 太郎'
              value={fullName}
              onChange={(e) =>
                handleChange('name', e.target.value, validateField)
              }
              onBlur={() => handleBlur('name', fullName, validateField)}
              error={fieldErrors.fullNameError}
            />
            <AccountInput
              label='電話番号'
              type='text'
              id='phone-number'
              placeholder='09012345678'
              value={phoneNumber}
              onChange={(e) =>
                handleChange('phoneNumber', e.target.value, validateField)
              }
              onBlur={() => {
                handleBlur('phoneNumber', phoneNumber, validateField);
              }}
              error={fieldErrors.phoneNumberError}
            />
            <AccountInput
              label='郵便番号'
              type='text'
              id='zip-code'
              placeholder='2708888'
              value={zipCode}
              onChange={(e) =>
                handleChange('zipCode', e.target.value, validateField)
              }
              onBlur={() => {
                handleBlur('zipCode', zipCode, validateField);
              }}
              error={fieldErrors.zipCodeError}
            />
            <AccountInput
              label='住所'
              type='text'
              id='address'
              placeholder='東京都渋谷区1-1-1'
              value={address}
              onChange={(e) =>
                handleChange('address', e.target.value, validateField)
              }
              onBlur={() => {
                handleBlur('address', address, validateField);
              }}
              error={fieldErrors.addressError}
            />
          </form>
        </div>

        {/* trạng thái ship hàng */}
        <fieldset>
          <label htmlFor='shipping-status'>発送状況:</label>
          <select
            className='ml-2 rounded border'
            name='shipping-status'
            id='shipping-status'
            value={shippingStatus}
            onChange={(e) => setShippingStatus(e.target.value)}
          >
            <option value='Processing'>未発送</option>
            <option value='Shipped'>完了</option>
          </select>
        </fieldset>

        {/* ghi chú */}
        <p>メッセージ: {order.notes}</p>

        <div className='flex justify-center space-x-4'>
          <button
            className='mt-4 min-w-60 rounded bg-red-500 px-4 py-2 text-white'
            onClick={(e) => handleDeleteOrder(e)}
          >
            削除
          </button>
          <button
            className='mt-4 min-w-60 rounded bg-blue-500 px-4 py-2 text-white'
            onClick={(e) => handleClickUpdate(e)}
          >
            更新
          </button>
        </div>
      </div>

      {/* modal xác nhận */}
      {isModalOpen && (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black/50'>
          <div className='w-[400px] rounded bg-white p-3 lg:w-[500px] lg:p-5'>
            <h2 className='text-center text-xl font-bold'>確認</h2>
            <p className='mb-4 text-center'>↓以下の内容で更新します。↓</p>
            {/* địa chỉ và thanh toán */}
            <h2 className='mt-5 text-xl font-semibold'>お届け先情報</h2>
            <ul className='space-y-1'>
              <li>
                名前: <span className='font-semibold'>{fullName}</span>
              </li>
              <li>
                電話番号: <span className='font-semibold'>{phoneNumber}</span>
              </li>
              <li>
                郵便番号: <span className='font-semibold'>{zipCode}</span>
              </li>
              <li>
                住所: <span className='font-semibold'>{address}</span>
              </li>
              <li>
                支払い状況:{' '}
                <span className='font-semibold'>{paymentInfo.status}</span>
              </li>
              <li>
                発送状況:{' '}
                <span className='font-semibold'>{shippingStatus}</span>
              </li>
            </ul>

            <div className='mt-5 flex justify-center gap-5'>
              <button
                className='w-full rounded bg-gray-200 p-2 text-black'
                onClick={handleCancelSubmit}
              >
                キャンセル
              </button>
              <button
                className='w-full rounded bg-[var(--color-primary)] p-2 text-white'
                onClick={handleSubmitForm}
              >
                確定する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OneOrder;
