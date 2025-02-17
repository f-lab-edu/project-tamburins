import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/product/:id' element={<ProductDetail />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
