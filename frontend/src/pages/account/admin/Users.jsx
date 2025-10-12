import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // call api lấy danh sách users cho admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // api lấy danh sách users theo thứ tự mới nhất là /api/users?sort=newest
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users?sort=newest`
        );

        if (!response.ok) {
          throw new Error('ネットワーク応答に問題があります');
        }
        const data = await response.json();
        console.log('Fetched users:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className='mb-6 text-center text-2xl font-bold'>
        ユーザー管理ページ
      </h1>
      {/* lg hiển thị dạng bảng */}
      <h1 className='mb-4 text-center text-lg font-semibold text-red-600 lg:hidden'>
        パソコン画面にてご確認ください。
      </h1>
      <table className='mb-20 w-full max-lg:hidden'>
        <thead className='border-b-2 text-left'>
          <tr>
            <th>ユーザーID</th>
            <th>姓</th>
            <th>名</th>
            <th>email</th>
            <th>電話番号</th>
            <th>郵便番号</th>
            <th>住所</th>
            <th>登録日</th>
            <th>詳細確認</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr
                className={`${user.isDeleted ? 'text-red-500' : ''} odd:bg-white even:bg-gray-100 ${user.isAdmin ? 'text-green-500' : ''}`}
                key={user._id}
              >
                <td>{user._id}</td>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.zipCode}</td>
                <td>{user.address}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className='text-blue-500'
                    onClick={() => navigate(`/account/admin/users/${user._id}`)}
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

export default Users;
