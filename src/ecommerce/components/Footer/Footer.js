import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <div className='px-[150px] pt-[25px] bg-[#faf7f7] mt-[30px] sm:px-[20px] sm:hidden'>
      <div className='flex gap-[50px] sm:flex-col sm:gap-[25px]'>
        <div className='flex flex-1 flex-col text-justify text-[14px]'>
          <h1 className='text-[16px] font-semibold text-[#3f3f3f]'>
            Categories
          </h1>
          <Link href={'/category/63ff2a78586ff01dd43c9b57'} className='w-max'>
            <span className='text-[#3f3f3f] text-[13px]'>Men</span>
          </Link>
          <Link href={'/category/63ff24af586ff01dd43c9b36'} className='w-max'>
            <span className='text-[#3f3f3f] text-[13px]'>Women</span>
          </Link>
          <Link href={'/category/63ff2a67586ff01dd43c9b55'} className='w-max'>
            <span className='text-[#3f3f3f] text-[13px]'>Kids</span>
          </Link>
          <Link href={'/category/63ff266b586ff01dd43c9b3f'} className='w-max'>
            <span className='text-[#3f3f3f] text-[13px]'>Beauty</span>
          </Link>
          <Link href={'/category/63ff2696586ff01dd43c9b41'} className='w-max'>
            <span className='text-[#3f3f3f] text-[13px]'>Accessories</span>
          </Link>
        </div>
        <div className='flex flex-1 flex-col text-justify text-[14px]'>
          <h1 className='text-[16px] font-semibold text-[#3f3f3f]'>About</h1>
          <span className='text-[#3f3f3f] text-[13px] text-justify'>
            {/* <p>Khoobsoorat Fabrics (P) Ltd.</p>
            <p>Plot No. 122, Patparganj, Industrial Area,</p>
            <p>Delhi - 110092, Near HDFC Bank</p>
            <p>Tel. 011 - 42178224, 011 - 42178225</p>
            <p>Email - kfpl2003@yahoo.com</p> */}
            <p>Some dummy address is here</p>
            <p>Tel. 011 - 123456789</p>
            <p>vikas1pandey020@gmail.com</p>
          </span>
        </div>
        <div className='flex flex-1 flex-col text-justify text-[14px]'>
          <h1 className='text-[16px] font-semibold text-[#3f3f3f]'>Contact</h1>
          <span className='text-[#3f3f3f] text-[13px] text-justify'>
            {/* <p>Vikas Pandey - 9810233123</p>
            <p>Rachit Jain - 9810233905</p> */}
            <p>Dummy User - 123456789</p>
          </span>
        </div>
      </div>
      <div className='flex justify-between mt-[50px] pb-[10px] items-center sm:justify-center'>
        <div className='flex items-center'>
          <span className='text-[24px] font-bold mr-[10px] sm:text-[18px]'>
            eCommerce
          </span>
          <span className='text-[12px] text-[#3f3f3f]'>
            &#169; Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className='sm:hidden'>
          <img
            src='https://res.cloudinary.com/dpc9y8njo/image/upload/v1677675093/e-comm/bxtxechgx78ji5ergrfx.png'
            alt='footer-image'
            className='h-[50px]'
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
