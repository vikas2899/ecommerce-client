import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useLogin } from '@/ecommerce/hooks/useLogin';

function LoginComponent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [IsInvalid, setInvalid] = useState(false);
  const { data, isLoading, isError, isFetching, isSuccess, error, refetch } =
    useLogin(formData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setInvalid(true);
      return;
    } else {
      refetch();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    if (!isFetching) {
      if (isSuccess) {
        localStorage.setItem('token', data?.data?.token);
        localStorage.setItem('user', JSON.stringify(data?.data?.info));
        router.push('/');
      }
    }
  }, [isFetching]);

  return (
    <div className='rounded-lg bg-[#ffffff] shadow-md w-[1000px] h-[600px] mx-auto flex overflow-hidden sm:h-screen sm:rounded-none'>
      <div className='w-[50%] sm:hidden'>
        <img
          src='https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo='
          className='w-[100%] h-[100%] object-cover'
          alt=''
        />
      </div>
      <div className='w-[50%] flex flex-col items-center sm:w-[100%] '>
        <h1 className='mt-10 text-[30px] sm:text-[22px]'>eCommerce</h1>
        <p className='mt-1 text-[#d7cece] text-center max-w-[330px] text-[14px]  sm:text-[12px]'>
          Selling only the best things online.
        </p>
        <h4 className='mt-10 text-[20px]  sm:text-[16px]'>Login</h4>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <div className='mt-10 flex flex-col items-center justify-center gap-4'>
            <TextField
              id='email'
              label='Email'
              variant='outlined'
              style={{ width: '330px' }}
              required
              className='rounded-lg'
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              autoComplete='off'
            />
            <TextField
              id='password'
              label='Password'
              type='password'
              variant='outlined'
              style={{ width: '330px' }}
              required
              className='rounded-lg'
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              autoComplete='off'
            />
          </div>
          <Button
            className='w-[330px] bg-[#2f68cb] text-[#ffffff] rounded-md mt-16 font-semibold hover:bg-[#2f68cb] py-3'
            type='submit'
          >
            {isLoading ? 'Please wait...' : 'Login'}
          </Button>
        </form>
        {isError && (
          <div className='mt-4'>
            <span className='text-[12px] text-[#ff9797] font-bold'>
              Invalid username or password
            </span>
          </div>
        )}

        <div className='mt-10'>
          <span className='mt-1 text-[#d7cece] text-center max-w-[330px] text-[14px]'>
            Don&#39;t have an account?
          </span>
          <span
            className='text-[#2f68cb] cursor-pointer text-[14px]'
            onClick={() => {
              router.push('/register');
            }}
          >
            &nbsp;Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
