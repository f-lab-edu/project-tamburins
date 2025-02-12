import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className='min-h-screen'>
      <section className='flex min-h-[100vh]'>
        <div className='flex-[1_1_50%]'>
          <Link
            to='/hand-lip/egg-lipbalm'
            className='text-lg font-medium text-gray-700 hover:text-black uppercase'
          >
            <img
              src='/images/pc_main_banner_half_left.jpg'
              alt='lip balm 이미지'
              className='w-full h-full object-cover'
            />
          </Link>
        </div>
        <div className='flex-[1_1_50%]'>
          <Link
            to='/hand-lip/egg-lipbalm'
            className='text-lg font-medium text-gray-700 hover:text-black uppercase'
          >
            <img
              src='/images/pc_main_banner_half_right.jpg'
              alt='lip balm 이미지'
              className='w-full h-full object-cover'
            />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
