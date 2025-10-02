import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// import cá nhân
import ProductItem from '../../components/ProductItem';

function SearchResults() {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // lấy từ khóa search từ URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search');

  // call api lấy danh sách sản phẩm từ từ khóa search
  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/search?search=${searchTerm}`
        );
        const data = await response.json();
        console.log('searched products:', data);
        setSearchedProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch searched products:', err);
      }
    };
    fetchSearchedProducts();
  }, [searchTerm]);

  if (isLoading) {
    return <div className='pt-5 text-center text-3xl'>Loading...</div>;
  }

  return (
    <div>
      <div className='mx-auto my-10 max-w-[1500px] px-5'>
        <h1 className='my-8 text-center text-3xl font-bold'>検索結果</h1>
        <div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {searchedProducts.length === 0 ? (
            <p className='col-span-full text-center'>
              該当する商品がありません。
            </p>
          ) : (
            searchedProducts.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
