import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Header from './components/Header';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:category' element={<CategoryPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/find/pw' element={<ForgotPasswordPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/mypage' element={<MyPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
