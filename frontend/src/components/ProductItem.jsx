import { Link } from 'react-router-dom';

function ProductItem(props) {
  return (
    <div className='relative'>
      <Link to={`/collections/products/${props.product.slug}`}>
        <img src={props.product?.images[0]} alt='' />
        <h2 className='h-[50px] text-lg/tight font-semibold'>
          {props.product.name}
        </h2>
        <p className='text-center text-lg font-semibold text-red-500'>
          ¥{props.product.price.toLocaleString()}
        </p>
        {props.product.stock === 0 && (
          <span className='absolute top-0 right-0 bg-red-500 px-2 py-1 text-xs text-white'>
            売り切れ
          </span>
        )}
      </Link>
    </div>
  );
}

export default ProductItem;
