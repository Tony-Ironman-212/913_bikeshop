// ý tưởng cho trang Checkout
// trước khi vào trang checkout thì phải đăng nhập, hoặc đã đăng nhập rồi thì phải check token còn hạn không?
// nếu không thì chuyển về trang login
// login xong thì chuyển trang về lại trang checkout
// check checkout sẽ có thông tin giỏ hàng,
// ô chọn phương thức thanh toán (銀行振り込み, ショッピングローン)
// ô điền thông tin giao hàng (họ tên, số điện thoại, mã bưu điện, địa chỉ)
// ô ghi chú (nếu có)
// nút đặt hàng
// modal xác nhận > nút chốt mua hàng

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/authContext';

// import cá nhân
import AccountInput from '../components/AccountInput';
import validateField from '../utils/validateField';

function Checkout() {
  const { user } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const [lastName, setLastName] = useState(user.lastName || '');
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '');
  const [zipCode, setZipCode] = useState(user.zipCode || '');
  const [address, setAddress] = useState(user.address || '');
  const [message, setMessage] = useState('');
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'BankTransfer',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    lastNameError: '',
    firstNameError: '',
    phoneNumberError: '',
    zipCodeError: '',
    addressError: '',
  });

  // xử lý xuống hàng cho modal message
  const modalMessage = message.split('\n').map((line, index) => {
    return <p key={index}>{line}</p>;
  });

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
      case 'lastName':
        setLastName(value);
        break;
      case 'firstName':
        setFirstName(value);
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

  // handle submit form chốt order
  const handleSubmitForm = async () => {
    try {
      // logic xử lý submit khi chốt đơn hàng
      // gọi api tạo order
      // nếu thất bại thì hiện lỗi, yêu cầu user thao tác lại
      // nếu thành công, xử lý trên server, phải trừ đi số lượng stock của document tương ứng
      // xóa thông tin giỏ hàng trong localStorage và context
      // chuyển vè trang user profile
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            items: cart.map((item) => {
              return {
                product: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
              };
            }),
            totalAmount: cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ),
            paymentInfo,
            shippingAddress: {
              fullName: `${lastName} ${firstName}`,
              phone: phoneNumber,
              zipCode,
              address,
            },
            notes: message,
          }),
        }
      );

      if (!response.ok) {
        alert('注文の送信に失敗しました。もう一度お試しください。');
        return;
      }

      const data = await response.json();
      alert('注文が正常に作成されました。マイページにてご確認ください。');

      // xóa giở hàng
      setCart([]);

      navigate(`/account/user/${data.userId}`); // điều hướng về trang user profile
    } catch (error) {
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    }
  };

  const handleCancelSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='mx-auto mt-5 max-w-[800px] space-y-8 px-3 py-5 lg:px-5'>
      <h1 className='text-center text-2xl font-bold'>チェックアウトページ</h1>
      {/* thông tin giỏ hàng */}
      <div className='mx-auto max-w-[600px]'>
        <h1 className='text-xl font-semibold'>
          カート({cart.reduce((total, item) => total + item.quantity, 0)})
        </h1>
        <ul>
          {cart.map((item, index) => {
            return (
              <li key={item._id} className='my-3'>
                <div className='flex justify-between gap-2'>
                  <div className='flex gap-2'>
                    <img width={150} src={item.images[0]} alt='' />
                    <div>
                      <p className='text-lg font-semibold'>{item.name}</p>
                      <span className='font-semibold'>
                        数量 - {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className='font-semibold'>
                    ¥{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className='mt-5 flex items-center justify-between border-t border-gray-400 pt-3'>
          <h1 className='text-xl font-semibold'>合計</h1>
          <span className='text-xl font-semibold'>
            ¥
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()}
          </span>
        </div>
      </div>

      {/* các thông tin còn lại khi order */}
      <div className='mx-auto my-10 max-w-[600px]'>
        <form
          action='#'
          method='POST'
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <h1 className='text-center text-2xl font-bold'>配送先</h1>
          <AccountInput
            label='姓'
            type='text'
            id='last-name'
            placeholder='田中'
            value={lastName}
            onChange={(e) =>
              handleChange('lastName', e.target.value, validateField)
            }
            onBlur={() => handleBlur('lastName', lastName, validateField)}
            error={fieldErrors.lastNameError}
          />
          <AccountInput
            label='名'
            type='text'
            id='first-name'
            placeholder='太郎'
            value={firstName}
            onChange={(e) =>
              handleChange('firstName', e.target.value, validateField)
            }
            onBlur={() => handleBlur('firstName', firstName, validateField)}
            error={fieldErrors.firstNameError}
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
          <fieldset className='my-5 flex flex-col'>
            <label htmlFor='message'>メッセージ(任意)</label>
            <textarea
              className='min-h-[150px] border border-gray-300 p-2 text-gray-800'
              name='message'
              id='message'
              placeholder='メッセージを入力してください'
              value={message}
              style={{ overflow: 'hidden' }}
              rows={1}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </fieldset>

          <h1 className='text-center text-2xl font-bold'>支払い方法</h1>
          <div>
            <div
              className='flex cursor-pointer items-center gap-3'
              onClick={() => {
                setPaymentInfo({ method: 'BankTransfer' });
              }}
            >
              <span className='flex size-5 items-center justify-center border'>
                {paymentInfo.method === 'BankTransfer' && (
                  <span className='absolute block size-[14px] bg-gray-800'></span>
                )}
              </span>
              <p className='font-semibold'>銀行振込</p>
            </div>
            <div
              className='flex cursor-pointer items-center gap-3'
              onClick={() => {
                setPaymentInfo({ method: 'ShoppingLoan' });
              }}
            >
              <span className='flex size-5 items-center justify-center border'>
                {paymentInfo.method === 'ShoppingLoan' && (
                  <span className='absolute block size-[14px] bg-gray-800'></span>
                )}
              </span>
              <p className='font-semibold'>ショッピングローン</p>
            </div>
            {/* thông tin chi tiết của chuyển khoản */}
            {paymentInfo.method === 'BankTransfer' && (
              <div className='my-4 bg-gray-100 p-2'>
                <h2>支払いについて</h2>
                <div>
                  <p>【口座情報】</p>
                  <p>銀行名 : 陽紀銀行</p>
                  <p>支店名 : 大阪堂島（789）</p>
                  <p>口座種別 : 普通</p>
                  <p>口座番号 : 2888</p>
                  <p>口座名義 : カ）ビーシーインターナショナル</p>
                </div>
                <div className='my-4'>
                  <p>
                    ※恐れ入りますがお振込み手数料はご負担下さいますようお願い申し上げます。
                  </p>
                  <p>
                    ※在庫確認メールから３日以内（金融機関休業日を除く）にお振込み下さいませ。
                  </p>
                  <p>
                    ご連絡無く期間内にご入金確認ができない場合は、自動的にご注文をキャンセルとさせて頂きますのでご了承願います。
                  </p>
                  <p>
                    また、その場合は以後のご注文はお受けできない場合やお客様登録を解除させて頂く場合がございます。
                  </p>
                  <p>
                    ※ご注文時のお名前とお振込み名義が違う場合は、必ず事前にご連絡下さいませ。
                  </p>
                </div>
              </div>
            )}

            {/* thông tin chi tiết của chuyển khoản */}
            {paymentInfo.method === 'ShoppingLoan' && (
              <div className='my-4 space-y-4 bg-gray-100 p-2'>
                <div>
                  <p>【注意事項】</p>
                  <p>※必ずお読みください。</p>
                  <p>
                    ■ローンのご利用は定職につかれ安定した収入のある方に
                    限らせていただいております。
                  </p>
                  <p>未成年もしくは学生の方はローン受付を致しかねます。</p>
                  <p>
                    また注文者名義以外でのローン申請は固くお断りいたします。
                  </p>
                  <p>
                    不正な申請が発覚した場合は信販会社に報告をいたしますので
                    悪しからずご了承くださいませ。
                  </p>
                </div>
                <div>
                  <p>■ローン審査通過後の注文キャンセルはお受けできかねます。</p>
                  <p>※製品不良など、当店の瑕疵による返品を除く。</p>
                </div>
                <div>
                  <p>【ローンのご利用につきまして】</p>
                  <p>■ショッピングローンは24回まで金利手数料が無料です。</p>
                  <p>※一部の商品は、金利手数料無料の対象外となります。</p>
                  <p>24回以上の場合は別途、金利手数料がかかります。</p>
                  <p>
                    24回以外のお支払い回数もしくは頭金をご希望の場合は
                    ご注文後にメールもしくはお電話でご相談くださいませ。
                  </p>
                </div>
                <div>
                  <p>
                    ■ご注文頂きましたらメールにて詳細と審査申請URLをご案内いたします。
                  </p>
                  <p>
                    審査が承認となりましたらその旨のご連絡と発送準備をいたします。
                  </p>
                  <p>
                    後日、ローンに関する書類が設定された住所に届きますので必ずご確認をお願いいたします。
                  </p>
                </div>
              </div>
            )}
          </div>
          <button
            className='w-full rounded bg-[var(--color-primary)] p-2 text-white disabled:opacity-50'
            type='button'
            disabled={
              Object.values(fieldErrors).some((error) => error !== '') ||
              !firstName ||
              !lastName ||
              !phoneNumber ||
              !zipCode ||
              !address ||
              cart.length === 0
            }
            onClick={() => setIsModalOpen(true)}
          >
            注文確認
          </button>
        </form>
      </div>

      {/* modal xác nhận */}
      {isModalOpen && (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black/50'>
          <div className='w-[400px] rounded bg-white p-3 lg:w-[500px] lg:p-5'>
            <h2 className='text-center text-xl font-bold'>確認</h2>
            <p className='mb-4 text-center'>↓以下の内容で注文します。↓</p>
            <ul className='space-y-1'>
              {/* thông tin items */}
              <h1 className='text-xl font-semibold'>
                カート({cart.reduce((total, item) => total + item.quantity, 0)})
              </h1>
              {cart.map((item, index) => (
                <li key={item._id} className='my-3'>
                  <div className='flex justify-between gap-2'>
                    <div>
                      <span>{index + 1}. </span>
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                    </div>
                    <span>{item.price * item.quantity}円</span>
                  </div>
                </li>
              ))}
              <div className='mt-5 flex items-center justify-between border-t border-gray-400 pt-3'>
                <h1 className='text-xl font-semibold'>合計</h1>
                <span className='text-xl font-semibold'>
                  ¥
                  {cart
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toLocaleString()}
                </span>
              </div>
              {/* địa chỉ và thanh toán */}
              <h2 className='mt-5 text-xl font-semibold'>お届け先情報</h2>
              <li>
                名前:{' '}
                <span className='font-semibold'>
                  {lastName} {firstName}
                </span>
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
                メッセージ:{' '}
                <span className='font-semibold'>{modalMessage}</span>
              </li>
              <li>
                支払い方法:{' '}
                <span className='font-semibold'>{paymentInfo.method}</span>
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

export default Checkout;
