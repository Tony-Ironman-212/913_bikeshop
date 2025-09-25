import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import cá nhân
import AccountInput from '../../components/AccountInput';
import validateField from '../../utils/validateField';

function Register() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  // state lưu lỗi cho từng trường
  const [fieldErrors, setFieldErrors] = useState({
    lastNameError: '',
    firstNameError: '',
    emailError: '',
    passwordError: '',
    passwordCheckError: '',
    agreementError: '',
  });

  // console.log(lastName, firstName, email, password, passwordCheck, isAgreed);
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
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordCheck':
        setPasswordCheck(value);
        break;
      case 'agreement':
        setIsAgreed(value);
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
  const submitRegister = async () => {
    try {
      // gửi data lên saver bằng api đã được cung cấp sẵn, fetch
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastName,
          firstName,
          email,
          password,
          isAgreed,
        }),
      });

      // trường hợp đăng ký thất bại response.ok = false
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error từ server:', errorData);
        setSubmitError(errorData.message || '登録に失敗しました');
        return;
      }

      // trường hợp thành công lấy data server trả về, và log ra,
      const data = await response.json();
      console.log(data);

      // đăng ký thành công, đóng modal, và hiện ra 1 bảng thông báo đăng ký thành công, và có nút điều hướng qua trang login
      setIsModalOpen(false);
      alert('ユーザー登録が完了しました。ログイン画面に移動します');

      // 👇 khi bấm OK alert, chạy tiếp và chuyển hướng
      navigate('/account/login');
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
        <h1 className='text-center text-2xl font-bold'>アカウント新規作成</h1>
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
          label='Email'
          type='email'
          id='email'
          placeholder='taro@example.com'
          value={email}
          onChange={(e) => handleChange('email', e.target.value, validateField)}
          onBlur={() => handleBlur('email', email, validateField)}
          error={fieldErrors.emailError}
        />
        <AccountInput
          label='パスワード'
          type='password'
          id='password'
          value={password}
          onChange={(e) =>
            handleChange('password', e.target.value, validateField)
          }
          onBlur={() => handleBlur('password', password, validateField)}
          error={fieldErrors.passwordError}
        />
        <AccountInput
          label='パスワード再確認'
          type='password'
          id='password-check'
          value={passwordCheck}
          onChange={(e) =>
            handleChange(
              'passwordCheck',
              e.target.value,
              validateField,
              password
            )
          }
          onBlur={() =>
            handleBlur('passwordCheck', passwordCheck, validateField, password)
          }
          error={fieldErrors.passwordCheckError}
        />
        <fieldset className='my-5'>
          <div className='flex items-center gap-2'>
            <input
              className='cursor-pointer'
              type='checkbox'
              checked={isAgreed}
              onChange={(e) =>
                handleChange('agreement', e.target.checked, validateField)
              }
            />
            <label className='cursor-pointer'>
              <Link
                className='text-blue-500 underline'
                to='/policies/terms-of-service'
              >
                利用規約に同意する<span className='text-red-500'>*</span>
              </Link>
            </label>
          </div>
          {fieldErrors.agreementError && (
            <span className='text-[12px] text-red-500'>
              {fieldErrors.agreementError}
            </span>
          )}
        </fieldset>
        <button
          className='w-full rounded bg-[var(--color-primary)] p-2 text-white disabled:opacity-50'
          type='button'
          disabled={
            Object.values(fieldErrors).some((error) => error !== '') ||
            !lastName ||
            !firstName ||
            !email ||
            !password ||
            !passwordCheck ||
            !isAgreed
          }
          onClick={() => setIsModalOpen(true)}
        >
          アカウントを作成する
        </button>
        <p className='my-5 text-center'>
          <Link to='/account/login'>ログイン画面に戻る</Link>
        </p>
      </form>

      {/* model xác nhận */}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
          <div className='w-[500px] rounded bg-white p-5'>
            <h2 className='text-center text-xl font-bold'>確認</h2>
            <p className='mb-4 text-center'>
              ↓以下の内容でアカウントを作成します↓
            </p>
            <ul className='space-y-1'>
              <li>姓: {lastName}</li>
              <li>名: {firstName}</li>
              <li>Email: {email}</li>
              <li>パスワード: {'*'.repeat(password.length)}</li>
              <li>利用規約に同意: {isAgreed ? 'はい' : 'いいえ'}</li>
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
                onClick={submitRegister}
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

export default Register;
