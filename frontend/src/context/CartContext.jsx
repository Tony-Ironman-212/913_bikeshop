// công thức tạo CartContext.
// import createContext, useContext, useState, thêm useEffect để lưu cart vào localStorage mỗi khi cart thay đổi
// tạo CartContext từ createContext.
// tạo component CartProvider, để wrap App, từ đó toàn bộ app đều có thể dùng state của CartContext.
// trong CartProvider, tạo state cart, giá trị ban đầu là lấy cart trong localStorage (nếu có) hoặc mảng rỗng.
// tạo hàm addToCart, khi user xem trang chi tiết sản phẩm mà bấn add to cart là hàm này sẽ được gọi và thêm sản phẩm vào state cart
// tưởng tư sẽ có hàm removeFromCart để xóa sản phẩm khỏi giỏ hàng
// tất nhiên là add hay remove thì cũng phải cập nhật localStorage nữa
// export useCart custom hook để các component khác có thể dễ dàng sử dụng CartContext

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //   hàm addToCart
  const addToCart = (product) => {
    setCart((prev) => {
      // trước khi thêm, kiếm tra xem sản phẩm đã có trong giỏ hàng chưa, nếu có rồi thì cộng 1 thêm quantity
      const existingProduct = prev.find((item) => item._id === product._id);
      if (existingProduct) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }]; // thêm quantity để biết số lượng sản phẩm
    });
  };

  // hàm removeFromCart
  const removeFromCart = (removeProductId) => {
    setCart((prev) => prev.filter((item) => item._id !== removeProductId));
  };

  // xử lý khi bấm nút +
  const incrementQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // xử lý khi bấm nút -
  const decrementQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //debug log cart
  // console.log('Cart updated:', cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
