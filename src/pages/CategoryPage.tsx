import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  const filteredProducts =
    products?.filter((product) => product.category === category) || [];

  return (
    <main>
      <h1>{category?.replace('-', ' ').toUpperCase()}</h1>

      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} width='200' />
                <h2>{product.name}</h2>
                <p>{product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>현재 이 카테고리에 등록된 상품이 없습니다.</p>
      )}
    </main>
  );
};

export default CategoryPage;
