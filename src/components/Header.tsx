import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingBag } from 'react-icons/fa'; // 아이콘 추가
import logo from '../assets/logo.svg';
import { useCart } from '../context/CartContext';

const Header = () => {
  const location = useLocation(); // 현재 경로 가져오기
  const isDetailPage = location.pathname !== '/'; // 루트가 아닐 경우 (상세페이지) 여부 확인
  const { openCart } = useCart();

  return (
    <header className='fixed top-0 left-0 w-full z-50 bg-transparent'>
      <div className='mx-auto px-6 py-4 flex justify-between items-center'>
        <h1 className='shrink-0'>
          <Link to='/'>
            <img src={logo} alt='' />
            <span className='sr-only'>tamburins</span>
          </Link>
        </h1>

        <nav>
          <ul className='flex space-x-6'>
            {[
              { path: '/category/evening-glow', label: 'evening glow' },
              { path: '/category/perfume', label: 'perfume' },
              { path: '/category/hand-lip', label: 'hand&lip' },
              { path: '/category/body', label: 'body' },
              { path: '/category/home-fragrance', label: 'home fragrance' },
              { path: '/store', label: 'store' },
            ].map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`text-lg uppercase hover:underline ${
                    isDetailPage ? 'text-black' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex items-center space-x-6'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search'
              className={`border rounded px-4 py-2 focus:outline-none ${
                isDetailPage
                  ? 'text-black border-black'
                  : 'text-white border-white'
              }`}
            />
            <FaSearch
              className={`absolute right-3 top-3 ${
                isDetailPage ? 'text-black' : 'text-white'
              }`}
            />
          </div>

          <Link
            to='/login'
            className={isDetailPage ? 'text-black' : 'text-white'}
          >
            <FaUser size={20} />
          </Link>

          <button
            onClick={openCart}
            className={isDetailPage ? 'text-black' : 'text-white'}
          >
            <FaShoppingBag size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
