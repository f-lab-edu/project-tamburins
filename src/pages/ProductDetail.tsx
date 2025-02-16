import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/products.json')
      .then((response) => response.json())
      .then((data) => {
        const foundProduct = data.find((p: Product) => p.id === id);
        if (!foundProduct) throw new Error('상품을 찾을 수 없습니다.');
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <main>
      <h1>{product?.name}</h1>
      <img src={product?.image} alt={product?.name} width='300' />
      <p>{product?.price}</p>
      <p>카테고리: {product?.category}</p>
    </main>
  );
};

export default ProductDetail;
