import Loader from '@/components/appLoader';
import dynamic from 'next/dynamic';

const MyAddedBooks = () => {
  const DynamicMyAddedBooks = dynamic(
    () => import("../../components/pages/myAddedBooks/index"),
    {
      loading: () => <Loader />,
    }
  );
  return (
    <div>

      <DynamicMyAddedBooks/>
    </div>
  )
}

export default MyAddedBooks