import { useState, useEffect } from 'react';

// import cá nhân
import ProductBanner from '../../components/ProductBanner';
import ProductItem from '../../components/ProductItem';
import FilterTool from '../../components/FilterTool';

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

  // call api lấy danh sách sản phẩm mới nhất
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('/api/products');
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
  const filteredProducts = allProducts.filter((product) => {
    // lọc theo trạng thái còn hàng / hết hàng
    if (filter.inStock && !filter.outOfStock && product.stock <= 0) {
      return false;
    }
    if (filter.outOfStock && !filter.inStock && product.stock > 0) {
      return false;
    }

    // lọc theo loại sản phẩm
    const types = ['bike', 'frame', 'wheel'];
    const selectedTypes = types.filter((type) => {
      return filter[type];
    });
    if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) {
      return false;
    }

    // lọc theo size
    const sizes = ['size44', 'size49', 'size52', 'size54', 'size56'];
    const selectedSizes = sizes.filter((size) => {
      return filter[size];
    });
    if (
      selectedSizes.length > 0 &&
      !selectedSizes.includes(`size${product.description.size}`)
    ) {
      return false;
    }

    // lọc theo khoảng giá
    if (product.price < filter.minPrice || product.price > filter.maxPrice) {
      return false;
    }

    return true;
  });

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
        <div className='w-[250px]'>
          <h2 className='mb-4 ml-5 font-semibold'>商品フィルター</h2>
          <FilterTool
            title='出品状況'
            field='status'
            filter={filter}
            setFilter={setFilter}
            filterItems={[
              { title: '在庫あり(15)', field: 'inStock' },
              { title: '在庫切れ(4)', field: 'outOfStock' },
            ]}
          />
          <FilterTool
            title='商品タイプ'
            field='type'
            filter={filter}
            setFilter={setFilter}
            filterItems={[
              { title: 'バイク(15)', field: 'bike' },
              { title: 'フレーム(4)', field: 'frame' },
              { title: 'ホイール(4)', field: 'wheel' },
            ]}
          />
          <FilterTool
            title='サイズ'
            field='size'
            filter={filter}
            setFilter={setFilter}
            filterItems={[
              { title: 'サイズ44(15)', field: 'size44' },
              { title: 'サイズ49(4)', field: 'size49' },
              { title: 'サイズ52(4)', field: 'size52' },
              { title: 'サイズ54(4)', field: 'size54' },
              { title: 'サイズ56(4)', field: 'size56' },
            ]}
          />
          <FilterTool
            title='価格'
            field='price'
            filter={filter}
            setFilter={setFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>

        {/* product list */}
        <div className='flex-1'>
          <h1 className='mb-8 text-center text-3xl font-bold'>
            全てのアイテム
          </h1>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredProducts.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default All;
