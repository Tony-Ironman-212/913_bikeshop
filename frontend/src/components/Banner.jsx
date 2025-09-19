import { Link } from 'react-router-dom';

function Banner(props) {
  return (
    <div className='relative h-[300px] overflow-hidden'>
      <Link to={props.link}>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white'>
          <h1 className='text-[60px]/[60px] font-bold'>{props.title}</h1>
          <h2 className='my-3 text-3xl font-semibold'>{props.subtitle}</h2>
          <button className='my-2 cursor-pointer border border-white px-8 py-2 font-semibold hover:bg-white hover:text-gray-800'>
            アイテムを見る
          </button>
        </div>
        <img
          className='h-full w-full object-cover'
          src={props.imgSrc}
          alt='banner'
        />
      </Link>
    </div>
  );
}

export default Banner;
