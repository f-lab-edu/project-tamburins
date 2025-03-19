import { useState } from 'react';
import { supabase } from '../api/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    setMessage('');
    setError('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password',
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
    }
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-white'>
      <div className='max-w-md mx-auto rounded-lg'>
        <h2 className='text-center text-xl font-bold mb-4'>비밀번호 찾기</h2>
        <input
          type='email'
          placeholder='이메일을 입력하세요'
          className='w-full p-3 border rounded mb-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleResetPassword}
          className='w-full py-3 bg-black text-white font-bold rounded cursor-pointer'
        >
          비밀번호 재설정 링크 보내기
        </button>
        {message && <p className='text-green-500 mt-3'>{message}</p>}
        {error && <p className='text-red-500 mt-3'>{error}</p>}
      </div>
    </main>
  );
}
