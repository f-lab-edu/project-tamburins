import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CartProvider, useCart } from './context/CartContext';
import CartModal from './components/CartModal';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Header />
          <Layout />
        </Router>
      </CartProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

const Layout = () => {
  const { isCartOpen, cartItems, closeCart } = useCart();

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>

      {isCartOpen && <CartModal cartItems={cartItems} onClose={closeCart} />}
    </>
  );
};

export default App;
