import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <nav className='p-4 bg-gray-200 flex justify-center space-x-4'>
        <Link to='/' className='text-lg font-semibold'>
          Home
        </Link>
        <Link to='/about' className='text-lg font-semibold'>
          About
        </Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
