import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [isForgotDisplay, setIsForgotDisplay] = useState(false);
  return (
    <div className='mx-auto my-10 max-w-[500px] px-5'>
      {/* Login Form */}
      {!isForgotDisplay && (
        <form action='#' method='POST'>
          <h1 className='text-center text-2xl font-bold'>ログイン</h1>
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
          <fieldset className='my-5 flex flex-col'>
            <label htmlFor='password'>Password</label>
            <input
              className='border border-gray-300 p-2'
              type='password'
              id='password'
              name='password'
              required
            />
          </fieldset>
          <p
            className='mb-2 cursor-pointer text-right'
            onClick={() => setIsForgotDisplay(true)}
          >
            パスワードを忘れた
          </p>
          <button
            className='w-full rounded bg-[var(--color-primary)] p-2 text-white'
            type='submit'
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
