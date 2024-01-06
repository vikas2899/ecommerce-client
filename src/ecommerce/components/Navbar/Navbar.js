import React, { useEffect, useState } from 'react';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import { useShoppingBag } from '@/ecommerce/context/BagContext/BagContext';
import { useUser } from '@/ecommerce/context/UserContext/UserContext';
import Link from 'next/link';
import SearchBox from '../SearchBox/SearchBox';

function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const { clearUserInfoAfterLogOut } = useUser();
  const { getShoppingBagCount, onClear } = useShoppingBag();

  const handleUserLogout = () => {
    clearUserInfoAfterLogOut();
    onClear();
    setUser(null);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <>
      <div className='w-[100%] bg-white flex h-[80px] md:justify-center items-center shadow-md sm:gap-[5px] sm:h-[60px] sm:sticky sm:top-0 sm:z-[600] sm:border-white sm:relative'>
        <div className='w-1/3 flex items-center justify-center sm:hidden'>
          <Link className='text-[22px] font-bold' href='/'>
            eCommerce
          </Link>
        </div>
        <div className='w-2/3 sm:hidden'>
          <SearchBox />
        </div>
        <div className='w-1/3 sm:w-full'>
          <div className='flex gap-10 w-[100%] justify-center sm:gap-[25px] sm:justify-evenly'>
            <Link
              className='flex-col items-center cursor-pointer hidden sm:block'
              href='/'
            >
              <span>
                <HomeIcon fontSize='medium' />
              </span>
              <p className='text-[12px] hidden'>Home</p>
            </Link>
            <Link
              className='flex flex-col items-center cursor-pointer'
              href='/order'
            >
              <span>
                <StoreOutlinedIcon fontSize='medium' />
              </span>
              <p className='text-[12px] sm:hidden'>Orders</p>
            </Link>
            <Link
              className='flex flex-col items-center cursor-pointer relative'
              href='/bag'
            >
              <LocalMallOutlinedIcon fontSize='medium' />
              {user && (
                <span className='h-[15px] w-[15px] bg-[red] absolute top-[-5px] right-0 rounded-[50%] flex justify-center items-center text-[13px] text-[white] font-[550]'>
                  {getShoppingBagCount()}
                </span>
              )}

              <p className='text-[12px] sm:hidden'>Bag</p>
            </Link>
            <div className='flex flex-col items-center cursor-pointer relative group'>
              <SentimentSatisfiedAltOutlinedIcon fontSize='medium' />
              <p className='text-[12px] sm:hidden'>Profile</p>
              <div className='absolute hidden flex-col bg-[#faf7f7] top-10 z-10 left-0 sm:right-0 sm:left-auto pb-[10px] rounded-md rounded-tl-none shadow-md group-hover:flex'>
                {user ? (
                  <Link
                    className='px-[10px] pt-[10px] pr-[50px] text-[14px] hover:bg-white'
                    href='/'
                    onClick={handleUserLogout}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    className='px-[10px] pt-[10px] pr-[50px] text-[14px] hover:bg-white'
                    href='/login'
                  >
                    Login
                  </Link>
                )}

                <span
                  className='px-[10px] pt-[10px] pr-[50px] text-[14px] hover:bg-white'
                  onClick={() => {
                    router.push(`/profile`);
                  }}
                >
                  Profile
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-2/3  hidden sm:block sm:w-full sm:mb-4 sm:mt-1'>
        <SearchBox />
      </div>
    </>
  );
}

export default Navbar;
