import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

// import cá nhân
import AccountInput from '../../components/AccountInput';
import validateField from '../../utils/validateField';

function Login() {
  const [isForgotDisplay, setIsForgotDisplay] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // state lưu lỗi cho từng trường
  const [fieldErrors, setFieldErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  // trang trước đó trước khi login, để điều hướng về lại
  const from = location.state?.from?.pathname || '/';
  console.log('from:', from);

  // handle change cho từng trường
  const handleChange = (field, value, validateField, password) => {
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
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

  // handle login
  const handleLogin = async () => {
    try {
      // B1 gọi api login đã được cung cấp sẵn, fetch api
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // B2 trường hợp login thất bại, response.ok = false
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error từ server:', errorData);
        setSubmitError(errorData.message || 'ログインに失敗しました');
        return;
      }
      //B3 trường hợp login thành công, lấy data server trả về, log ra
      const data = await response.json();
      console.log('Login successful:', data);

      //B4 gọi hàm login của context để lưu user vào context
      await login(data.user, data.token);

      //B5 điều hướng về trang trước đó
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='mx-auto my-10 min-h-[530px] max-w-[500px] px-5'>
      {/* Login Form */}
      {!isForgotDisplay && (
        <form
          action='#'
          method='POST'
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <h1 className='text-center text-2xl font-bold'>ログイン</h1>
          <AccountInput
            label='Email'
            type='email'
            id='email'
            placeholder='taro@example.com'
            value={email}
            onChange={(e) =>
              handleChange('email', e.target.value, validateField)
            }
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
          {submitError && <p className='text-red-500'>{submitError}</p>}
          <p
            className='mb-2 cursor-pointer text-right'
            onClick={() => setIsForgotDisplay(true)}
          >
            パスワードを忘れた
          </p>
          <button
            className='w-full rounded bg-[var(--color-primary)] p-2 text-white disabled:opacity-50'
            type='button'
            disabled={
              fieldErrors.emailError !== '' ||
              fieldErrors.passwordError !== '' ||
              email === '' ||
              password === ''
            }
            onClick={handleLogin}
          >
            ログイン
          </button>
          <p className='my-5 text-center'>
            <Link to='/account/register'>アカウント新規作成</Link>
          </p>
        </form>
      )}

      {/* Forgot Password Form */}
      {isForgotDisplay && (
        <form action='#' method='POST'>
          <h1 className='text-center text-2xl font-bold'>パスワードの再設定</h1>
          <h1 className='text-center text-xl'>
            パスワード再設定用のメールをお送りします。
          </h1>

          <fieldset className='my-5 flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input
              className='border border-gray-300 p-2'
              type='email'
              id='email'
              name='email'
              required
            />
          </fieldset>

          <button
            className='w-full rounded bg-[var(--color-primary)] p-2 text-white'
            type='submit'
          >
            決定
          </button>
          <p
            className='my-5 cursor-pointer text-center'
            onClick={() => setIsForgotDisplay(false)}
          >
            キャンセル
          </p>
        </form>
      )}
    </div>
  );
}

export default Login;
