import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <main className='min-h-screen bg-white flex items-center justify-center'>
      <h1 className='text-4xl font-bold'>
        {category?.replace('-', ' ').toUpperCase()}
      </h1>
    </main>
  );
};

export default CategoryPage;
