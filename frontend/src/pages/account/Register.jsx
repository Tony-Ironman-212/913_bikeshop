import { useState } from 'react';
import { Link } from 'react-router-dom';

// import cá nhân
import AccountInput from '../../components/AccountInput';

function Register() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

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

  // validate chung cho tất cả các trường
  const validateField = (field, value, password) => {
    switch (field) {
      case 'lastName':
        return value.trim() === '' ? '姓を入力してください' : '';
      case 'firstName':
        return value.trim() === '' ? '名を入力してください' : '';
      case 'email':
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return !emailRegex.test(value) ? '有効なEmailを入力してください' : '';
      case 'password':
        return value.length < 6
          ? 'パスワードは6文字以上である必要があります'
          : '';
      case 'passwordCheck':
        return value !== password ? 'パスワードが一致しません' : '';
      case 'agreement':
        return !value ? '利用規約に同意する必要があります' : '';
    }
  };

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
    console.log('Submitting form...');
  };

  // handle chặn phím enter submit keydown enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div className='mx-auto my-10 max-w-[500px] px-5'>
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
          type='submit'
          disabled={
            Object.values(fieldErrors).some((error) => error !== '') ||
            !lastName ||
            !firstName ||
            !email ||
            !password ||
            !passwordCheck ||
            !isAgreed
          }
        >
          アカウントを作成する
        </button>
        <p className='my-5 text-center'>
          <Link to='/account/login'>ログイン画面に戻る</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
