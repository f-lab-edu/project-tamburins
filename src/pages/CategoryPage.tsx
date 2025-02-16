import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter(
          (product: Product) => product.category === category
        );
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((err) => {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h2>{category?.replace('-', ' ').toUpperCase()}</h2>

      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} width='200' />
                <h3>{product.name}</h3>
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
