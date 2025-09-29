import { Link } from 'react-router-dom';

function ProductItem(props) {
  return (
    <div>
      <Link to={`/collections/products/${props.product.slug}`}>
        <img src={props.product?.images[0]} alt='' />
        <h2 className='h-[50px] text-lg/tight font-semibold'>
          {props.product.name}
        </h2>
        <p className='text-center text-lg font-semibold text-red-500'>
          ¥{props.product.price.toLocaleString()}
        </p>
      </Link>
    </div>
  );
}

export default ProductItem;
