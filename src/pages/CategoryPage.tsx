import { useParams, Link } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/data/products.json');
  if (!response.ok) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
  return response.json();
};

const ProductList = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart } = useCart();

  const { data: products } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const filteredProducts =
    products?.filter((product) => product.category === category) || [];

  return (
    <main className='main'>
      <section className='section'>
        <div className='section_inner'>
          <h2>{category?.replace('-', ' ').toUpperCase()}</h2>

          {filteredProducts.length > 0 ? (
            <ul className='flex'>
              {filteredProducts.map((product) => (
                <li key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} width='200' />
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                  </Link>
                  <button
                    className='mt-2 w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition'
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      })
                    }
                  >
                    장바구니 추가
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>현재 이 카테고리에 등록된 상품이 없습니다.</p>
          )}
        </div>
      </section>
    </main>
  );
};

const CategoryPage = () => (
  <Suspense fallback={<p>로딩 중...</p>}>
    <ProductList />
  </Suspense>
);

export default CategoryPage;
