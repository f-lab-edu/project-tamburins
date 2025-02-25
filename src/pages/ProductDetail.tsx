import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import CartModal from '../components/CartModal';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/data/products.json');
  if (!response.ok) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
  return response.json();
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const product = products?.find((product) => product.id === id);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (isLoading) return <p className='text-center py-10 text-lg'>로딩 중...</p>;
  if (error)
    return <p className='text-center py-10 text-red-500'>{error.message}</p>;
  if (!product)
    return (
      <p className='text-center py-10 text-gray-500'>
        상품을 찾을 수 없습니다.
      </p>
    );

  const addToCart = () => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  return (
    <main className='main w-full'>
      <section className='section flex flex-col md:flex-row gap-10'>
        <div className='w-full md:w-1/2 flex justify-center'>
          <img
            src={product.image}
            alt={product.name}
            className='w-full max-w-lg object-cover rounded-lg'
          />
        </div>

        <div className='w-full md:w-1/2 space-y-6'>
          <h2 className='text-2xl font-bold'>{product.name}</h2>
          <p className='text-lg font-semibold text-gray-700'>{product.price}</p>
          <div className='flex space-x-4'>
            <button
              className='w-full py-3 bg-black text-white text-lg font-medium rounded-md hover:bg-gray-900 transition'
              onClick={addToCart}
            >
              장바구니에 추가
            </button>
          </div>
        </div>
      </section>

      {isCartOpen && (
        <CartModal cartItems={cart} onClose={() => setIsCartOpen(false)} />
      )}
    </main>
  );
};

export default ProductDetail;
