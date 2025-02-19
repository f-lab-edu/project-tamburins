import { useParams } from 'react-router-dom';
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

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  const product = products?.find((product) => product.id === id);

  if (!product) return <p>상품을 찾을 수 없습니다.</p>;

  return (
    <main className='main'>
      <section className='section'>
        <div className='section_inner'>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} width='300' />
          <p>{product.price}</p>
          <p>카테고리: {product.category}</p>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
