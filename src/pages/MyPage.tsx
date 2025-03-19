import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export default function MyPage() {
  const { data: user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      console.log('로그아웃 성공');
      navigate('/');
    },
    onError: (error: Error) => {
      alert(`로그아웃 실패: ${error.message}`);
    },
  });

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-white'>
      <h1 className='text-2xl font-bold'>마이페이지</h1>
      {user ? (
        <div className='mt-4'>
          <p>이메일: {user.email}</p>
          <button
            onClick={() => logoutMutation.mutate()}
            className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
          </button>
        </div>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </main>
  );
}
