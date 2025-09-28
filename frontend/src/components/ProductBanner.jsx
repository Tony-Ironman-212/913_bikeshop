function ProductBanner(props) {
  return (
    <div className='relative h-[250px] overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white'>
        <h2 className='my-3 text-3xl font-semibold'>{props.title}</h2>
      </div>
      <img
        className={`object-[${props.imgPosition}] h-full w-full object-cover`}
        src={`/img/${props.imgUrl}`}
        alt='banner'
      />
    </div>
  );
}

export default ProductBanner;
