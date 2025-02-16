import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category/:category' element={<CategoryPage />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
