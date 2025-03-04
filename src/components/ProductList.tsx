import { useEffect, useState } from 'react';
import { supabase } from '../api/supabaseClient';

// TEST용
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');

      if (error) {
        console.error('데이터 불러오기 오류:', error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>가격: {product.price}원</p>
            <img src={product.image} alt={product.name} width='100' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
