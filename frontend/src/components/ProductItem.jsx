import { Link } from 'react-router-dom';

function ProductItem() {
  return (
    <div>
      <Link to='/collections/products/1'>
        <img src='/img/cart_img_test.webp' alt='' />
        <h2 className='text-lg font-semibold'>
          AETHOS PRO FORCE ETAP AXS 54cm 2022年
        </h2>
        <p className='text-center text-lg font-semibold text-red-500'>
          ¥490,000
        </p>
      </Link>
    </div>
  );
}

export default ProductItem;
