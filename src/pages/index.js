import CategoryHeader from '@/ecommerce/components/CategoryHeader/CategoryHeader';
import PopularProducts from '@/ecommerce/components/PopularProducts/PopularProducts';
import Slider from '@/ecommerce/components/Slider/Slider';
import { useGetCategories } from '@/ecommerce/hooks/useCategory';
import { CircularProgress } from '@mui/material';

export default function Home() {
  const { isLoading, data, error } = useGetCategories();
  if (isLoading) {
    return (
      <div className='text-center'>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Slider />
      <div className='w-[88%] m-auto'>
        <div className='mb-[85px] overflow-x-auto overflow-y-hidden sm:mb-[5px] sm:no-scrollbar'>
          {data && <CategoryHeader data={data} />}
        </div>

        {data &&
          data?.data
            ?.filter((item) => item.secondaryTag.includes('bestseller'))
            .map((item) => {
              return (
                <div
                  className='flex w-[100%] gap-2 justify-center'
                  key={item._id}
                >
                  <PopularProducts categoryId={item._id} />
                </div>
              );
            })}
      </div>
    </div>
  );
}
