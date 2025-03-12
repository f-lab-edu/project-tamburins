import { useState, FormEvent } from 'react';
import { supabase } from '../api/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log('로그인 성공');
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleLogin} className='mt-6'>
      <div className='mb-4'>
        <input
          type='email'
          placeholder='아이디(이메일)'
          className='w-full p-3 border rounded'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='mb-6'>
        <input
          type='password'
          placeholder='비밀번호'
          className='w-full p-3 border rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type='submit'
        className='w-full py-3 bg-black text-white font-bold rounded cursor-pointer'
      >
        로그인
      </button>
      {error && <p className='text-red-500 mt-3'>{error}</p>}
    </form>
  );
}
