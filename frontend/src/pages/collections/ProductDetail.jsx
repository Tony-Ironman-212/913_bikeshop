import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bigImageIndex, setBigImageIndex] = useState(0);
  const location = useLocation();
  const slug = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`);
        const data = await response.json();
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
      }
    };
    fetchProduct();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const imageUrls = product.images;

  return (
    <div className='mx-auto flex w-[1500px] gap-8 px-5 pt-12'>
      {/* hình ảnh */}
      <div>
        <div className='h-[400px] w-[600px]'>
          <img
            className='h-full w-full object-cover'
            src={imageUrls[bigImageIndex]}
            alt={`Product image ${bigImageIndex + 1}`}
          />
        </div>
        <div className='mt-2 w-[600px] overflow-x-auto'>
          <div className='flex space-x-2'>
            {imageUrls.map((url, index) => {
              return (
                <span
                  className={`${bigImageIndex === index ? 'border-[var(--color-primary)]' : 'border-transparent'} inline-block w-26 flex-shrink-0 cursor-pointer border border-2`}
                  key={index}
                  onClick={() => setBigImageIndex(index)}
                >
                  <img
                    className='h-full w-full object-cover'
                    src={url}
                    alt={`Product image ${index + 1}`}
                  />
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {/* thông tin sản phẩm */}
      <div className='flex-1'>
        <header>
          <p>
            <Link className='hover:underline' to='/'>
              Home
            </Link>{' '}
            /{' '}
            <Link className='hover:underline' to='/collections/all'>
              すべてのアイテム
            </Link>
          </p>
          <h2 className='my-4 text-3xl font-semibold'>{product.name}</h2>
          <p className='text-xl font-semibold text-red-500'>
            ¥{product.price.toLocaleString()}
          </p>
          <p>税込です。 送料は無料です。</p>
          <p className='my-4 border-b border-gray-800'></p>
        </header>
        <div>
          <p className='text-lg font-bold'>サイズ {product.description.size}</p>
          <p
            className='mb-8 cursor-pointer text-lg font-semibold underline-offset-2 hover:underline'
            onClick={() => {
              alert('現社確認（来店ご予約）フォームはこちら');
            }}
          >
            現社確認（来店ご予約）フォームはこちら
          </p>
          <button className='mx-auto mb-4 block w-100 rounded border border-gray-500 px-4 py-2 font-semibold'>
            カートに追加
          </button>
          <button className='mx-auto block w-100 rounded bg-[var(--color-primary)] px-4 py-2 font-semibold text-white'>
            今すぐ購入
          </button>
          <div className='mt-8 flex gap-4'>
            <FontAwesomeIcon
              className='relative top-1 text-xl'
              icon={faHouse}
            />
            <div>
              <h2 className='text-lg font-semibold'>
                実店舗（東京）での受け取りが可能です。
              </h2>
              <p className='text-sm'>通常2〜4日で準備が完了します</p>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <p className='text-lg font-semibold'>--基本情報--</p>
          <ul className='mt-1 list-disc pl-10 text-lg font-medium'>
            <li>年式：{product.description.year}</li>
            <li>メーカーサイズ：{product.description.size}cm</li>
            <li>重量：{product.description.weight}</li>
          </ul>
        </div>
        {product.description.sizeInfo && (
          <div className='mt-6'>
            <p className='text-lg font-semibold'>
              --サイズインフォメーション--
            </p>
            <ul className='mt-1 list-disc pl-10 text-lg font-medium'>
              <li>トップチューブ長：{product.description.sizeInfo.topTube}</li>
              <li>シートチューブ長：{product.description.sizeInfo.seatTube}</li>
            </ul>
          </div>
        )}
        {product.description.specInfo && (
          <div className='mt-6'>
            <p className='text-lg font-semibold'>
              --スペックインフォメーション--
            </p>
            <ul className='mt-1 list-disc pl-10 text-lg font-medium'>
              <li>グループセット：{product.description.specInfo.group}</li>
              <li>ホイールセット：{product.description.specInfo.wheel}</li>
            </ul>
          </div>
        )}
        <div className='mt-6'>
          <p className='text-lg font-semibold'>--コンディション--</p>
          <ul className='mt-1 list-disc pl-10 text-lg font-medium'>
            {product.description.condition.map((cond, index) => (
              <li key={index}>{cond}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
