import React, { useState, useEffect } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import ClearIcon from '@mui/icons-material/Clear';
import { getDiscountPercentage } from '@/ecommerce/utils/utils';
import { useRouter } from 'next/router';
import { useShoppingBag } from '@/ecommerce/context/BagContext/BagContext';

function BagCard({ data }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState();

  const [user, setUser] = useState(null);

  const { removeProductFromBag, updateUserBag } = useShoppingBag();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    setQuantity(data?.quantity);
  }, [data]);

  const handleQuantityChange = (type) => {
    if ((type === 'inc' && quantity >= 2) || (type === 'dec' && quantity <= 1))
      return;
    else if (type === 'inc') {
      const bagData = {
        userid: user?._id,
        productId: data?.productId?._id,
        // quantity: quantity * 2,
        quantity: quantity + 1,
      };
      updateUserBag(bagData);
      // setQuantity((quantity) => quantity * 2);
      setQuantity((quantity) => quantity + 1);
    } else if (type === 'dec') {
      const bagData = {
        userid: user?._id,
        productId: data?.productId?._id,
        // quantity: quantity / 2,
        quantity: quantity - 1,
      };
      updateUserBag(bagData);
      // setQuantity((quantity) => quantity / 2);
      setQuantity((quantity) => quantity - 1);
    }
  };

  const navigateOnClick = () => {
    router.push(`/product/${data?.productId?._id}`);
  };

  const handleRemoveFromBag = () => {
    if (!user) {
      alert('Please login first!');
      return;
    }

    const bagData = {
      userid: user?._id,
      productId: data.productId._id,
    };
    removeProductFromBag(bagData);
  };

  return (
    <div className='flex w-[100%] h-[175px] sm:h-[200px] border-[1px] border-[lightgray] rounded-md mb-[15px] shadow-sm cursor-pointer'>
      <div
        className='flex-[1] p-[8px] rounded-md overflow-hidden'
        onClick={() => navigateOnClick()}
      >
        <img
          src={data?.productId?.image?.primary}
          className='w-[100%] h-[100%] object-cover overflow-hidden rounded-md'
        />
      </div>
      <div className='flex-[2] p-[8px]'>
        <div className='flex flex-col justify-around h-[100%]'>
          <div className='flex flex-col'>
            <div className='flex justify-between mb-[10px] items-center'>
              <span className='font-[550] text-[16px] sm:text-[14px]'>
                {data?.productId?.brand}
              </span>
              <span onClick={() => handleRemoveFromBag()}>
                <ClearIcon style={{ fontSize: '15px', marginRight: '10px' }} />
              </span>
            </div>
            <span className='sm:text-[12px] text-[#434343] text-[14px]'>
              {data?.productId?.name}
            </span>
          </div>
          <div>
            <span className='flex items-center gap-2 mt-[10px]'>
              <span className='sm:text-[12px] text-[14px] font-bold'>
                &#8377;{data?.productId?.price}
              </span>
              <span className='text-[12px] text-[#7e818c] line-through'>
                &#8377;
                {+data?.productId?.price + data?.productId?.discount_price}
              </span>
              <span className='text-[12px] text-[#ff905a]'>
                (
                {getDiscountPercentage(
                  data?.productId?.price,
                  data?.productId?.discount_price
                )}
                % OFF)
              </span>
            </span>
          </div>
          <div>
            <div className='mb-[10px] flex items-center gap-[5px]'>
              <span className='sm:text-[12px] text-[13px]'>Quantity :</span>
              <span className='flex gap-[10px] items-center'>
                <button
                  className='bg-[lightgray] py-[1px] px-[5px] text-[10px] rounded-sm'
                  onClick={() => handleQuantityChange('dec')}
                >
                  -
                </button>
                <span className='sm:text-[12px] text-[13px]'>{quantity}</span>
                <button
                  className='bg-[lightgray] py-[1px] px-[5px] text-[10px] rounded-sm'
                  onClick={() => handleQuantityChange('inc')}
                >
                  +
                </button>
              </span>
            </div>
            <span className='flex items-center'>
              <KeyboardReturnIcon style={{ fontSize: '12px' }} />
              <span className='text-[10px] ml-[5px]'>
                7 days return available
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BagCard;
