function sortProducts(filteredProducts, selectedSort) {
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'a-z':
        return a.name.localeCompare(b.name);
      case 'z-a':
        return b.name.localeCompare(a.name);
    }
    return 0;
  });
  return sortedProducts;
}

export default sortProducts;
