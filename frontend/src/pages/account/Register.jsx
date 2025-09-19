import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='mx-auto my-10 max-w-[500px] px-5'>
      <form action='#' method='POST'>
        <h1 className='text-center text-2xl font-bold'>アカウント新規作成</h1>
        <fieldset className='my-5 flex flex-col'>
          <label htmlFor='last-name'>姓</label>
          <input
            className='border border-gray-300 p-2'
            type='text'
            id='last-name'
            name='last-name'
            required
          />
        </fieldset>
        <fieldset className='my-5 flex flex-col'>
          <label htmlFor='first-name'>名</label>
          <input
            className='border border-gray-300 p-2'
            type='text'
            id='first-name'
            name='first-name'
            required
          />
        </fieldset>
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
          <label htmlFor='password'>パスワード</label>
          <input
            className='border border-gray-300 p-2'
            type='password'
            id='password'
            name='password'
            required
          />
        </fieldset>
        <fieldset className='my-5 flex flex-col'>
          <label htmlFor='password'>パスワード再確認</label>
          <input
            className='border border-gray-300 p-2'
            type='password'
            id='password'
            name='password'
            required
          />
        </fieldset>
        <fieldset className='my-5 flex items-center gap-2'>
          <input className='cursor-pointer' type='checkbox' required />
          <label className='cursor-pointer'>
            <Link
              className='text-blue-500 underline'
              to='/policies/terms-of-service'
            >
              利用規約に同意する
            </Link>
          </label>
        </fieldset>
        <button
          className='w-full rounded bg-[var(--color-primary)] p-2 text-white'
          type='submit'
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
