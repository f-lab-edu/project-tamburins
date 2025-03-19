import { useState, FormEvent } from 'react';
import { supabase } from '../api/supabaseClient';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  const handleAllCheck = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setTermsChecked(newCheckedState);
    setPrivacyChecked(newCheckedState);
    setMarketingChecked(newCheckedState);
  };

  const handleIndividualCheck = () => {
    if (termsChecked && privacyChecked && marketingChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== passwordCheck) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!termsChecked || !privacyChecked) {
      setError('이용약관 및 개인정보 수집 동의가 필요합니다.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('회원가입이 완료되었습니다! 이메일을 확인하세요.');
    }
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-white'>
      <section className='max-w-md w-full p-8 rounded-lg'>
        <h2 className='text-center text-xl font-bold mb-6'>회원가입</h2>
        <form onSubmit={handleSignUp} autoComplete='off'>
          <div className='mb-4'>
            <label htmlFor='signUpEmail' className='block font-bold'>
              아이디(이메일)*
            </label>
            <input
              id='signUpEmail'
              type='email'
              placeholder='이메일 입력'
              className='w-full mt-2 p-3 border rounded'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block font-bold'>
              비밀번호*
            </label>
            <input
              id='password'
              type='password'
              placeholder='8자리 이상, 영어, 숫자, 특수문자 포함'
              className='w-full mt-2 p-3 border rounded'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='passwordCheck' className='block font-bold'>
              비밀번호 확인*
            </label>
            <input
              id='passwordCheck'
              type='password'
              placeholder='비밀번호를 한번 더 입력'
              className='w-full mt-2 p-3 border rounded'
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='gender' className='block font-bold'>
              성별
            </label>
            <select
              id='gender'
              className='w-full mt-2 p-3 border rounded'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value=''>성별을 선택해주세요.</option>
              <option value='male'>남성</option>
              <option value='female'>여성</option>
              <option value='none'>선택안함</option>
            </select>
          </div>

          <div className='mb-6'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='allCheck'
                checked={allChecked}
                onChange={handleAllCheck}
              />
              <label htmlFor='allCheck' className='ml-2'>
                모두 동의합니다.
              </label>
            </div>

            <div className='ml-4'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='termsOfUse'
                  checked={termsChecked}
                  onChange={() => {
                    setTermsChecked(!termsChecked);
                    handleIndividualCheck();
                  }}
                />
                <label htmlFor='termsOfUse' className='ml-2'>
                  (필수) 이용약관 동의
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='privacyPolicy'
                  checked={privacyChecked}
                  onChange={() => {
                    setPrivacyChecked(!privacyChecked);
                    handleIndividualCheck();
                  }}
                />
                <label htmlFor='privacyPolicy' className='ml-2'>
                  (필수) 개인정보 수집∙이용 동의
                </label>
              </div>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='marketing'
                  checked={marketingChecked}
                  onChange={() => {
                    setMarketingChecked(!marketingChecked);
                    handleIndividualCheck();
                  }}
                />
                <label htmlFor='marketing' className='ml-2'>
                  (선택) 마케팅 정보 수신 동의
                </label>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='w-full py-3 bg-black text-white font-bold rounded cursor-pointer'
          >
            가입하기
          </button>

          {error && <p className='text-red-500 mt-3'>{error}</p>}
          {message && <p className='text-green-500 mt-3'>{message}</p>}
        </form>
      </section>
    </main>
  );
}
