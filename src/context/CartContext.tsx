import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === newItem.product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === newItem.product.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        return [...prevCart, newItem];
      }
    });

    openCart();
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.product.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        cartItems,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('CartProvider를 찾을 수 없습니다.');
  }
  return context;
};
