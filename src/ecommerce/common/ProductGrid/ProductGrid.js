import React from 'react';
import EastIcon from '@mui/icons-material/East';
import ProductCard from '../ProductCard/ProductCard';
import Link from 'next/link';

function ProductGrid({ productData }) {
  return (
    <div className='w-[100%] mb-[50px] sm:mb-[0px]'>
      <div className='w-[100%] flex justify-between items-center '>
        <h2 className='text-[1.2rem] font-bold tracking-[0.08rem] text-[#3e4152] sm:tracking-[0.01rem] uppercase sm:text-[14px]'>
          top picks in {productData?.[0]?.categoryId?.name} category
        </h2>
        <Link
          className='cursor-pointer flex items-center gap-[5px]'
          href={`/category/${productData?.[0]?.categoryId?._id}`}
        >
          <span className='text-[16px] sm:text-[12px] sm:ml-[10px]'>
            View All
          </span>
          <span className='sm:hidden'>
            <EastIcon />
          </span>
        </Link>
      </div>
      <div className='mt-5 h-[354px] flex gap-[10px] sm:h-[350px] overflow-x-auto'>
        {productData &&
          productData.map((item) => {
            return <ProductCard data={item} key={item._id} />;
          })}
      </div>
    </div>
  );
}

export default ProductGrid;
