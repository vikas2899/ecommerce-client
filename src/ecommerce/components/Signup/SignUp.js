import React, { useState } from 'react';
import Head from 'next/head';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useCreateUser } from '../../hooks/useCreateUser';
import { isValidEmail } from '@/ecommerce/utils/utils';

function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    mobile: '',
  });
  const [IsInvalid, setInvalid] = useState(false);
  const { data, isLoading, isError, error, refetch } = useCreateUser(formData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password ||
      !formData.mobile
    ) {
      setInvalid(true);
      return;
    } else if (!isValidEmail(formData.email)) {
      setInvalid(true);
      return;
    } else {
      setInvalid(false);
      refetch();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      mobile: '',
    });
  };

  return (
    <div className='rounded-lg bg-[#ffffff] shadow-md w-[1000px] h-[600px] mx-auto flex overflow-hidden sm:h-screen sm:rounded-none'>
      <Head>
        <title>Register</title>
      </Head>
      <div className='w-[50%] flex flex-col items-center sm:w-[100%]'>
        <h1 className='mt-7 text-[30px] sm:text-[22px]'>eCommerce</h1>
        <p className='mt-1 text-[#d7cece] text-center max-w-[330px] text-[14px] sm:text-[12px]'>
          Selling only the best things online.
        </p>
        <h4 className='mt-5 text-[20px] sm:text-[16px]'>Register</h4>
        <form onSubmit={(e) => handleFormSubmit(e)} className='sm:w-[100%]'>
          <div className='mt-7 flex flex-col gap-4 w-[100%] px-10'>
            <div className='flex w-[100%] gap-2 justify-center sm:flex-col sm:gap-[15px]'>
              <TextField
                id='outlined-basic'
                label='First Name *'
                variant='outlined'
                className='rounded-lg'
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                inputProps={{
                  style: {
                    height: '15px',
                    width: '45%',
                  },
                }}
                autoComplete='off'
                autoFocus
              />
              <TextField
                id='outlined-basic'
                label='Last Name *'
                variant='outlined'
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                className='rounded-lg'
                inputProps={{
                  style: {
                    width: '45%',
                    height: '15px',
                  },
                }}
                autoComplete='off'
              />
            </div>
            <TextField
              id='outlined-basic'
              type='email'
              label='Email *'
              variant='outlined'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className='rounded-lg'
              inputProps={{
                style: {
                  height: '15px',
                  width: '100%',
                },
              }}
              autoComplete='off'
            />
            <TextField
              id='outlined-basic'
              type='password'
              label='Password *'
              variant='outlined'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              inputProps={{
                style: {
                  height: '15px',
                  width: '100%',
                },
              }}
              className='rounded-lg'
              autoComplete='off'
            />
            <TextField
              id='outlined-basic'
              type='number'
              label='Mobile *'
              variant='outlined'
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              inputProps={{
                style: {
                  height: '15px',
                  width: '100%',
                },
              }}
              className='rounded-lg'
              autoComplete='off'
            />
            <Button
              className='w-[100%] bg-[#2f68cb] text-[#ffffff] rounded-md mt-5 font-semibold hover:bg-[#2f68cb] py-3'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? 'Please Wait...' : 'Register'}
            </Button>
          </div>
        </form>
        <div className='mt-5'>
          {isError && error?.response?.data === 'User already exist' ? (
            <p className='text-[12px] text-[#ff7878] text-center font-bold'>
              User with provided email already exist.
            </p>
          ) : (
            isError && (
              <p className='text-[12px] text-[#ff7878] text-center font-bold'>
                Something went wrong. Please try after sometime.
              </p>
            )
          )}
          {data && !IsInvalid && !isError && (
            <p className='text-[12px] text-[#4ccc72] text-center font-bold'>
              Registration successful. Please login
            </p>
          )}
          {IsInvalid && (
            <p className='text-[12px] text-[#ff7878] text-center font-bold'>
              *Invalid Details or email
            </p>
          )}
          <span className='mt-1 text-[#d7cece] text-center max-w-[330px] text-[14px]'>
            Already have an account?
          </span>
          <span
            className='text-[#2f68cb] cursor-pointer text-[14px]'
            onClick={() => {
              router.push('/login');
            }}
          >
            &nbsp;Login
          </span>
        </div>
      </div>
      <div className='w-[50%] sm:hidden'>
        <img
          src='https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo='
          className='w-[100%] h-[100%] object-cover'
        />
      </div>
    </div>
  );
}

export default SignUp;
