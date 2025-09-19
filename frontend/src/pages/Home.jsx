import { Link } from 'react-router-dom';

// import cá nhân
import ProductItem from '../components/ProductItem';
import BannerList from '../components/BannerList';

function Home() {
  return (
    <div>
      <div className='relative h-[550px] overflow-hidden'>
        <Link to='/collections/all'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white'>
            <h1 className='text-[80px]/[80px] font-bold'>SPECIALIZED</h1>
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
      <div className='mx-auto my-10 max-w-[1500px] px-5'>
        <h1 className='my-8 text-center text-3xl font-bold'>新着アイテム</h1>
        <div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
        <BannerList />
      </div>
    </div>
  );
}

export default Home;
