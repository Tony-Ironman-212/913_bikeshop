import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import cá nhân
import AccountInput from '../../components/AccountInput';
import validateField from '../../utils/validateField';
import { useAuth } from '../../context/authContext';

function UserUpdate() {
  const { user, updateUser } = useAuth();
  const [lastName, setLastName] = useState(user.lastName || '');
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone || '');
  const [zipCode, setZipCode] = useState(user.zipCode || '');
  const [address, setAddress] = useState(user.address || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  // state lưu lỗi cho từng trường
  const [fieldErrors, setFieldErrors] = useState({
    lastNameError: '',
    firstNameError: '',
    phoneNumberError: '',
    zipCodeError: '',
    addressError: '',
  });

  // console.log(lastName, firstName, phoneNumber, zipCode, address);
  // console.log(fieldErrors);

  // handle change cho từng trường
  const handleChange = (field, value, validateField, password) => {
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
      [field + 'Error']: validateField(field, value, password),
    }));
  };

  // handle blur cho từng trường
  const handleBlur = (field, value, validateField, password) => {
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [field + 'Error']: validateField(field, value, password),
    }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // handle chặn phím enter submit keydown enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // tách riêng hàm submit register
  const submitUpdate = async () => {
    try {
      // gửi data lên saver bằng api đã được cung cấp sẵn, fetch
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/update/${user._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lastName,
            firstName,
            phone: phoneNumber,
            zipCode,
            address,
          }),
        }
      );

      // trường hợp đăng ký thất bại response.ok = false
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error từ server:', errorData);
        setSubmitError(errorData.message || '更新に失敗しました');
        return;
      }

      // trường hợp thành công lấy data server trả về, và log ra,
      const data = await response.json();
      // console.log(data);
      // cập nhật user mới vào context
      const updatedUser = data.user;
      updateUser(updatedUser);
      // reset lỗi
      setSubmitError('');

      // đăng ký thành công, đóng modal, và hiện ra 1 bảng thông báo đăng ký thành công, và có nút điều hướng qua trang login
      setIsModalOpen(false);
      alert('ユーザー情報が更新されました。マイページに移動します');

      // 👇 khi bấm OK alert, chạy tiếp và chuyển hướng
      navigate(`/account/user/${user._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // handle cancel submit
  const handleCancelSubmit = () => {
    setSubmitError('');
    setIsModalOpen(false);
  };

  return (
    <div className='mx-auto my-10 min-h-[530px] max-w-[500px] px-5'>
      <form
        action='#'
        method='POST'
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
      >
        <h1 className='text-center text-2xl font-bold'>アカウント情報更新</h1>
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
        <button
          className='w-full rounded bg-[var(--color-primary)] p-2 text-white disabled:opacity-50'
          type='button'
          disabled={
            Object.values(fieldErrors).some((error) => error !== '') ||
            !lastName ||
            !firstName ||
            !phoneNumber ||
            !zipCode ||
            !address
          }
          onClick={() => setIsModalOpen(true)}
        >
          情報を更新する
        </button>
        <p className='my-5 text-center'>
          <Link to={`/account/user/${user._id}`}>マイページに戻る</Link>
        </p>
      </form>

      {/* modal xác nhận */}
      {isModalOpen && (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black/50'>
          <div className='w-[400px] rounded bg-white p-3 lg:w-[500px] lg:p-5'>
            <h2 className='text-center text-xl font-bold'>確認</h2>
            <p className='mb-4 text-center'>
              ↓以下の内容でアカウントを更新します↓
            </p>
            <ul className='space-y-1'>
              <li>姓: {lastName}</li>
              <li>名: {firstName}</li>
              <li>電話番号: {phoneNumber}</li>
              <li>郵便番号: {zipCode}</li>
              <li>住所: {address}</li>
            </ul>
            {submitError && <p className='text-red-500'>{submitError}</p>}
            <div className='mt-5 flex justify-center gap-5'>
              <button
                className='w-full rounded bg-gray-200 p-2 text-black'
                onClick={handleCancelSubmit}
              >
                キャンセル
              </button>
              <button
                className='w-full rounded bg-[var(--color-primary)] p-2 text-white'
                onClick={submitUpdate}
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

export default UserUpdate;
