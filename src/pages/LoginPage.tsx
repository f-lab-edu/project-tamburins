import LoginForm from '../components/LoginForm';
import SocialLogin from '../components/SocialLogin';

export default function LoginPage() {
  return (
    <main className='min-h-screen flex items-center justify-center bg-white'>
      <section className='max-w-md w-full p-8 rounded-lg'>
        <h2 className='text-center text-xl font-bold'>로그인</h2>
        <LoginForm />
        <div className='flex justify-center gap-3 text-sm text-gray-600 mt-4'>
          <a href='/find/pw'>비밀번호 찾기</a> <span>|</span>
          <a href='/signUp'>회원가입</a>
        </div>
        <SocialLogin />
      </section>
    </main>
  );
}
