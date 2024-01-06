import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency, formatDate } from '@/ecommerce/utils/utils';
import StarRating from '@/ecommerce/common/StarRating/StarRating';
import { useUpdateOrderRating } from '@/ecommerce/hooks/useOrder';

function OrderCard({ orderData }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [showBtn, setShowBtn] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const { mutate: updateRating } = useUpdateOrderRating();

  const handleNavigation = (pid) => {
    router.push(`product/${pid}`);
  };

  const handleSubmitOrderRating = () => {
    const updateData = {
      userid: user._id,
      orderid: orderData._id,
      rating: rating,
    };
    updateRating(updateData, {
      onSuccess: () => {
        setShowBtn(false);
      },
    });
  };

  return (
    <div className='flex flex-col border-[1px] border-[lightgray] h-[250px] rounded-md overflow-hidden mb-[25px] sm:w-[100%] sm:h-auto'>
      <div className='bg-[#F0F2F2]'>
        <div className='flex justify-between w-[97%] mx-auto py-[10px] items-center sm:flex-col sm:items-start sm:pt-[0px]'>
          <div className='flex gap-20 sm:flex-col sm:gap-2'>
            <div className='flex flex-col'>
              <span className='text-[#565959] text-[12px] uppercase sm:hidden'>
                ORDER PLACED
              </span>
              <span className='text-[14px] uppercase sm:hidden'>
                {formatDate(orderData.orderDate)}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row items-center gap-2'>
              <span className='text-[#565959] text-[12px] uppercase sm:text-[12px]'>
                TOTAL
              </span>
              <span className='text-[14px]  sm:text-[12px]'>
                {formatCurrency(orderData.amount)}
              </span>
            </div>
            <div className='flex'>
              <span
                className={`${
                  orderData.status === 'delivered'
                    ? 'text-[#1dad1d]'
                    : 'text-[#e08331]'
                } text-[12px] uppercase font-[600] sm:text-[12px]`}
              >
                {orderData.status}
              </span>
            </div>
          </div>
          <div className='flex'>
            <div className='flex flex-col'>
              <span className='text-[#565959] text-[12px] sm:hidden'>
                ORDER # {orderData._id}
              </span>
              <Link
                className='text-[14px] hover:underline sm:text-[12px]'
                href={`order/${orderData._id}`}
              >
                View order details
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t-[1px] border-[lightgray] pt-[15px]'>
        <div className='w-[97%] mx-auto flex justify-between sm:flex-col'>
          <div className='flex flex-col'>
            <div>
              {orderData.status !== 'pending' ? (
                <span className='font-[550] text-[14px]'>
                  Delivered {orderData.deliveredDate}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className='mt-[15px] flex items-center gap-5'>
              <div
                className='w-[100px] h-[100px] rounded-md overflow-hidden cursor-pointer sm:w-[200px]'
                onClick={() => handleNavigation(orderData.productId._id)}
              >
                <img
                  className='w-[100%] h-[100%] object-cover'
                  src={orderData?.productId?.image?.primary}
                />
              </div>
              <div className='flex flex-col'>
                <span className='font-[550] sm:text-[14px]'>
                  {orderData?.productId?.brand}
                </span>
                <span className='text-[14px] text-[#858585] sm:text-[12px]'>
                  {orderData?.productId?.name}
                </span>
                <span className='text-[14px] text-[#858585] sm:text-[12px]'>
                  Quantity - {orderData?.quantity}
                </span>
              </div>
            </div>
          </div>
          <div className='pr-[25px] sm:mt-[10px] sm:flex sm:items-center sm:justify-between sm:mb-[10px] sm:pr-[2px]'>
            <div>
              <span className='font-[550] text-[14px]'>Rate your order</span>
              <StarRating
                setRating={setRating}
                rating={orderData?.orderRating}
              />
            </div>
            {showBtn && (
              <div className='sm:w-[100px]'>
                <button
                  className='text-[12px] border-[1px] w-[100%] mt-[10px] rounded-[5px] bg-[#ffffbc] h-[25px] hover:bg-[#ffff93]'
                  onClick={() => handleSubmitOrderRating()}
                >
                  Submit Rating
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
