import { useState, useEffect } from 'react';

// import cá nhân
import ProductBanner from '../../components/ProductBanner';
import ProductItem from '../../components/ProductItem';
import FilterToolPanel from '../../components/FilterToolPanel';
import SortTool from '../../components/SortTool';
import filterProducts from '../../utils/filterProducts';
import sortProducts from '../../utils/sortProducts';

function All() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 2000000]);

  // state liên quan đến filter tool
  const [filter, setFilter] = useState({
    inStock: false,
    outOfStock: false,
    bike: false,
    frame: false,
    wheel: false,
    size44: false,
    size49: false,
    size52: false,
    size54: false,
    size56: false,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });

  // state liên quan đến sắp xếp sản phẩm
  const [selectedSort, setSelectedSort] = useState('');

  // call api lấy danh sách sản phẩm mới nhất
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        const data = await response.json();
        setAllProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch all products:', err);
      }
    };
    fetchAllProducts();
  }, []);

  // lọc sản phẩm dựa trên filter
  const filteredProducts = filterProducts(allProducts, filter);

  // sắp xếp sản phẩm dựa trên selectedSort, rồi render ra giao diện
  const sortedProducts = sortProducts(filteredProducts, selectedSort);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductBanner
        title='全ての商品'
        imgUrl='home_banner.webp'
        imgPosition='center_70%'
      />

      <div className='mx-auto mt-10 mb-30 flex max-w-[1500px] gap-x-4 px-5'>
        {/* panel lọc sản phẩm */}
        <FilterToolPanel
          filter={filter}
          setFilter={setFilter}
          Products={allProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {/* product list */}
        <div className='flex-1'>
          <h1 className='mb-2 text-center text-3xl font-bold'>
            全てのアイテム
          </h1>
          <div className='mb-3 flex items-center justify-between'>
            <p>({filteredProducts.length}) 商品</p>
            <SortTool
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {sortedProducts.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default All;
