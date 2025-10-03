import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
      <div className='my-10 gap-8 lg:flex'>
        <div className='my-5 flex flex-1/3 flex-col gap-2 text-lg'>
          <h2>会員情報</h2>
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
        <div className='my-5 flex flex-2/3 flex-col gap-2'>
          <h2>購入履歴</h2>
          <table>
            <thead className='border-b-2'>
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
              <tr>
                <td>123456</td>
                <td>2024-01-15</td>
                <td>Specialized Allez</td>
                <td>1</td>
                <td>発送済み</td>
                <td>¥100,000</td>
              </tr>
              <tr>
                <td>123456</td>
                <td>2024-01-15</td>
                <td>Specialized Allez</td>
                <td>1</td>
                <td>発送済み</td>
                <td>¥100,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
