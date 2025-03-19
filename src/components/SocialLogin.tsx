import { useMutation } from '@tanstack/react-query';
import { supabase } from '../api/supabaseClient';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export default function SocialLogin() {
  const navigate = useNavigate();

  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      console.log('Google 로그인 성공');
      navigate('/');
    },
    onError: (error: Error) => {
      alert(`Google 로그인 실패: ${error.message}`);
    },
  });

  return (
    <div className='flex flex-col items-center gap-3 mt-6'>
      <button
        onClick={() => googleLoginMutation.mutate()}
        className='w-full flex items-center justify-center py-3 bg-gray-100 text-black font-bold rounded cursor-pointer'
      >
        <FcGoogle />
        Google 로그인
      </button>
    </div>
  );
}
