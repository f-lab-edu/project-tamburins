import { supabase } from '../api/supabaseClient';
import { FcGoogle } from 'react-icons/fc';

export default function SocialLogin() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Google 로그인 실패:', error);
    } else {
      console.log('Google 로그인 성공');
    }
  };

  return (
    <div className='flex flex-col items-center gap-3 mt-6'>
      <button
        onClick={handleGoogleLogin}
        className='w-full flex items-center justify-center py-3 bg-gray-100 text-black font-bold rounded cursor-pointer'
      >
        <FcGoogle />
        Google 로그인
      </button>
    </div>
  );
}
