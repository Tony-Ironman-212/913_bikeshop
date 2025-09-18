import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='relative h-[550px] overflow-hidden'>
        <Link to='/collections/all'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white'>
            <h1 className='text-[80px]/[80px] font-bold'>SPECIALIZED</h1>
            <h2 className='my-3 text-3xl font-semibold'>
              公式認定中古車ストア
            </h2>
            <button
              className='my-4 cursor-pointer border border-white px-8 py-2 font-semibold hover:bg-white hover:text-gray-800'
              onClick={() => navigate('/collections/all')}
            >
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
    </div>
  );
}

export default Home;
