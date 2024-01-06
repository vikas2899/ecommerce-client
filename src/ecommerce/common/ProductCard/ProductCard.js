import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { textShortner } from '@/ecommerce/utils/utils';
import { formatCurrency, getDiscountPercentage } from '@/ecommerce/utils/utils';
import { useRouter } from 'next/router';

function ProductCard({ data }) {
  const router = useRouter();

  const handleCardClick = (pid) => {
    router.push(`/product/${pid}`);
  };

  if (data) {
    return (
      <div
        className='rounded bg-[#fffff] w-[250px] h-[350px] hover:shadow-md cursor-pointer sm:h-[300px] sm:w-[178px] sm:shadow-sm'
        onClick={() => handleCardClick(data?._id)}
      >
        <div className='h-[75%] relative sm:h-[68%]'>
          <img
            className='h-[100%] border-[0.5px] border-[lightgray] w-full object-cover'
            src={data.image?.primary}
          />
          <span className='absolute bottom-1 left-2 z-20 bg-[#ffffff] px-[10px] rounded'>
            <span className='text-[12px] mr-[3px]'>4.1</span>
            <span className='w-[2px]'>
              <StarIcon style={{ color: 'green', fontSize: '13px' }} />
            </span>
          </span>
        </div>
        <div className='flex flex-col px-[12px] pt-[10px]'>
          <span className='text-[16px] font-bold sm:text-[14px]'>
            {data?.brand}
          </span>
          <span className='text-[13px] text-[#535766] font-normal sm:text-[12px]'>
            {textShortner(data?.name, 24)}
          </span>
          <div className='flex items-center gap-2 mt-[5px]'>
            <span className='text-[13px] font-bold sm:text-[12px]'>
              {formatCurrency(data?.price)}
            </span>
            {data?.discount_price !== 0 && (
              <span className='flex gap-1'>
                <span className='text-[10px] text-[#7e818c] line-through sm:text-[8px]'>
                  {formatCurrency(+data?.price + data?.discount_price)}
                </span>
                <span className='text-[10px] text-[#ff905a] sm:text-[8px]'>
                  ({getDiscountPercentage(data?.price, data?.discount_price)}%
                  OFF)
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
