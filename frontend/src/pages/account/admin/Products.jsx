import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // call api lấy danh sách products cho admin
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // api lấy danh sách products theo thứ tự mới nhất là /api/products/admin/all?sort=newest
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/admin/all?sort=newest`
        );

        if (!response.ok) {
          throw new Error('ネットワーク応答に問題があります');
        }
        const data = await response.json();
        console.log('Fetched products:', data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className='mb-6 text-center text-2xl font-bold'>商品管理ページ</h1>
      {/* lg hiển thị dạng bảng */}
      <h1 className='mb-4 text-center text-lg font-semibold text-red-600 lg:hidden'>
        パソコン画面にてご確認ください。
      </h1>
      <table className='mb-20 w-full max-lg:hidden'>
        <thead className='border-b-2 text-left'>
          <tr>
            <th>商品ID</th>
            <th>イメージ</th>
            <th>タイプ</th>
            <th>名前</th>
            <th>価格</th>
            <th>在庫</th>
            <th>詳細確認</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr
                className={`${product.isDeleted ? 'text-red-500' : ''} odd:bg-white even:bg-gray-100`}
                key={product._id}
              >
                <td>{product._id}</td>
                <td>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='h-16 w-24 object-cover'
                  />
                </td>
                <td>{product.type}</td>
                <td>{product.name}</td>
                <td>¥{product.price.toLocaleString()}</td>
                <td
                  className={`${product.stock === 0 ? 'bg-red-500 text-white' : ''}`}
                >
                  {product.stock}
                </td>
                <td>
                  <button
                    className='text-blue-500'
                    onClick={() =>
                      navigate(`/account/admin/products/${product._id}`)
                    }
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

export default Products;
