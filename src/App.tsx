import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:category' element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
