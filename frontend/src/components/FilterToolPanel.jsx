import FilterTool from './FilterTool';

function FilterToolPanel(props) {
  const { filter, setFilter, Products, priceRange, setPriceRange } = props;

  // tính số lượng sản phẩm theo từng mục
  const quantityInStock = Products.filter(
    (product) => product.stock > 0
  ).length;
  const quantityOutOfStock = Products.filter(
    (product) => product.stock === 0
  ).length;
  const quantityBikes = Products.filter(
    (product) => product.type === 'bike'
  ).length;
  const quantityFrames = Products.filter(
    (product) => product.type === 'frame'
  ).length;
  const quantityWheels = Products.filter(
    (product) => product.type === 'wheel'
  ).length;
  const quantitySize44 = Products.filter(
    (product) => product.description.size === '44'
  ).length;
  const quantitySize49 = Products.filter(
    (product) => product.description.size === '49'
  ).length;
  const quantitySize52 = Products.filter(
    (product) => product.description.size === '52'
  ).length;
  const quantitySize54 = Products.filter(
    (product) => product.description.size === '54'
  ).length;
  const quantitySize56 = Products.filter(
    (product) => product.description.size === '56'
  ).length;

  return (
    // Filter panel để lọc sản phẩm
    <div className='w-[250px]'>
      <h2 className='mb-4 ml-5 font-semibold'>商品フィルター</h2>
      <FilterTool
        title='出品状況'
        field='status'
        filter={filter}
        setFilter={setFilter}
        filterItems={[
          { title: `在庫あり(${quantityInStock})`, field: 'inStock' },
          { title: `在庫切れ(${quantityOutOfStock})`, field: 'outOfStock' },
        ]}
      />
      <FilterTool
        title='商品タイプ'
        field='type'
        filter={filter}
        setFilter={setFilter}
        filterItems={[
          { title: `バイク(${quantityBikes})`, field: 'bike' },
          { title: `フレーム(${quantityFrames})`, field: 'frame' },
          { title: `ホイール(${quantityWheels})`, field: 'wheel' },
        ]}
      />
      <FilterTool
        title='サイズ'
        field='size'
        filter={filter}
        setFilter={setFilter}
        filterItems={[
          { title: `サイズ44(${quantitySize44})`, field: 'size44' },
          { title: `サイズ49(${quantitySize49})`, field: 'size49' },
          { title: `サイズ52(${quantitySize52})`, field: 'size52' },
          { title: `サイズ54(${quantitySize54})`, field: 'size54' },
          { title: `サイズ56(${quantitySize56})`, field: 'size56' },
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
  );
}

export default FilterToolPanel;
