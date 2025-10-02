import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import cá nhân
import ProductItem from '../components/ProductItem';

function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // call api lấy danh sách sản phẩm mới nhất
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products?sort=newest&limit=8`
        );
        const data = await response.json();
        setNewProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch new products:', err);
      }
    };
    fetchNewProducts();
  }, []);

  if (isLoading) {
    return <div className='pt-5 text-center text-3xl'>Loading...</div>;
  }

  return (
    <div>
      <div className='relative h-[550px] overflow-hidden'>
        <Link to='/collections/all'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white'>
            <h1 className='text-[60px]/[60px] font-bold lg:text-[80px]/[80px]'>
              SPECIALIZED
            </h1>
            <h2 className='my-3 text-3xl font-semibold'>
              公式認定中古車ストア
            </h2>
            <button className='my-4 cursor-pointer border border-white px-8 py-2 font-semibold hover:bg-white hover:text-gray-800'>
              アイテムを見る
            </button>
          </div>
          <img
            className='h-full w-full object-cover'
            src='/img/home_banner.webp'
            alt='banner'
          />
        </Link>
      </div>
      <div className='mx-auto my-10 max-w-[1500px] px-3 lg:px-5'>
        <h1 className='my-8 text-center text-3xl font-bold'>新着アイテム</h1>
        <div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {newProducts.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
