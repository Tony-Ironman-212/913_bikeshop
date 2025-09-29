function filterProducts(products, filter) {
  // lọc sản phẩm dựa trên filter
  const filteredProducts = products.filter((product) => {
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
  return filteredProducts;
}

export default filterProducts;
