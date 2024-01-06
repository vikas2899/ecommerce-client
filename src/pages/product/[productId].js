import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Rating from '@/ecommerce/common/Rating/Rating';
import { textShortner, getDiscountPercentage } from '@/ecommerce/utils/utils';
import { useGetProduct } from '@/ecommerce/hooks/useProducts';
import { useGetProductComments } from '@/ecommerce/hooks/useComments';
import Review from '@/ecommerce/components/Review/Review';
import { formatCurrency } from '@/ecommerce/utils/utils';
import { useShoppingBag } from '@/ecommerce/context/BagContext/BagContext';
import { useSaveUserComment } from '@/ecommerce/hooks/useComments';
import ReviewModal from '@/ecommerce/common/Modal/ReviewModal';
import { INC_FACTOR } from '@/ecommerce/utils/utils';
import { CircularProgress } from '@mui/material';

function ProductDetail() {
  const router = useRouter();
  const productId = router.query.productId;
  let [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const { addProductToBag, checkProductInBagStatus, removeProductFromBag } =
    useShoppingBag();
  const productInBagStatus = checkProductInBagStatus(productId);

  const { isLoading, data } = useGetProduct(productId);
  const {
    isLoading: isCommentLoading,
    data: commentData,
    refetch: refetchComments,
  } = useGetProductComments(productId);

  const URL = data?.data?.image?.primary;

  const URL2 = data?.data?.image?.secondary1;

  const URL3 = data?.data?.image?.secondary2;

  const [currentImage, setCurrentImage] = useState(data?.data?.image?.primary);
  const { mutate: saveUserComment } = useSaveUserComment();

  useEffect(() => {
    setCurrentImage(data?.data?.image?.primary);
  }, [data]);

  const handleHover = (url) => {
    setCurrentImage(url);
  };

  function handleClick(url) {
    router.replace(url);
  }

  const handleAddToBag = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    const bagData = {
      userid: user?._id,
      productId: productId,
      // quantity: 1000,
      quantity: 1,
    };

    addProductToBag(bagData);
  };

  const handleAddToBagAndCheckout = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!checkProductInBagStatus(productId)) {
      handleAddToBag();
    }
    router.push('/bag');
  };

  const handleRemoveFromBag = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    const bagData = {
      userid: user?._id,
      productId: productId,
    };
    removeProductFromBag(bagData);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSaveUserComment = (commentData) => {
    if (!commentData) return;
    saveUserComment(
      { productId, commentData },
      {
        onSuccess: () => {
          refetchComments();
        },
      }
    );
  };

  const breadcrumbs = [
    <Link
      underline='hover'
      key='1'
      color='inherit'
      onClick={() => handleClick('/')}
      className='hover:text-[#89a103] font-semibold'
    >
      Home
    </Link>,
    <Link
      underline='hover'
      key='2'
      color='inherit'
      onClick={() => handleClick(`/category/${data?.data?.categoryId?._id}`)}
      className='hover:text-[#89a103] font-semibold'
    >
      {data?.data?.categoryId?.name}
    </Link>,
    <Typography key='3' className='text-[#89a103] font-semibold'>
      {data && textShortner(data?.data?.name, 15)}
    </Typography>,
  ];

  if (isLoading) {
    return (
      <div className='text-center'>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex w-[90%] mt-[25px] m-auto relative sm:flex-col'>
      <div className='flex flex-1 flex-col h-[500px] '>
        <div className='flex flex-1 gap-2 sm:flex-col-reverse'>
          <div className='flex flex-col sm:flex-row flex-1 h-[100px] w-full justify-between'>
            <div
              className='p-[5px] bg-[#dedede] cursor-pointer border-2 border-transparent hover:border-indigo-400 hover:border-2 sm:w-[100px] sm:h-[75px]'
              onMouseOver={() => handleHover(URL)}
            >
              <img
                src={URL}
                className='sm:object-contain object-cover w-[100%] h-[40px] sm:h-[100%]'
              />
            </div>
            <div
              className='p-[5px] bg-[#dedede] cursor-pointer border-2 border-transparent hover:border-indigo-400 hover:border-2 sm:w-[100px]  sm:h-[75px]'
              onMouseOver={() => handleHover(URL2)}
            >
              <img
                src={URL2}
                className='sm:object-contain object-cover w-[100%] h-[40px] sm:h-[100%]'
              />
            </div>
            <div
              className='p-[5px] bg-[#dedede] cursor-pointer border-2 border-transparent hover:border-indigo-400 hover:border-2 sm:w-[100px]  sm:h-[75px]'
              onMouseOver={() => handleHover(URL3)}
            >
              <img
                src={URL3}
                className='sm:object-contain object-cover w-[100%] h-[40px] sm:h-[100%]'
              />
            </div>
          </div>
          <div className='flex-[8] h-[500px] relative sm:flex-none'>
            <div
              className='absolute top-0 left-0 right-0 w-[100%] h-[100%] bg-no-repeat bg-cover'
              style={{ backgroundImage: `url(${currentImage})` }}
            ></div>
          </div>
        </div>
        <div className='flex flex-1 mt-[50px] gap-8 sm:flex-col sm:gap-4'>
          {!productInBagStatus ? (
            <div className='sm:w-full w-[50%] h-[50px] rounded-md overflow-hidden border-[1px] bg-[#f1f3ff] border-[#0881adfb] transition-all duration-300 hover:bg-[#ebeeff]'>
              <button
                className='w-[100%] h-[100%] font-[500]'
                onClick={() => handleAddToBag()}
              >
                Add To Bag
              </button>
            </div>
          ) : (
            <div className='sm:w-full w-[50%] h-[50px] rounded-md overflow-hidden border-[1px] bg-[#fff1f1] border-[#ff2e2efb] transition-all duration-300 hover:bg-[#ffe9e9]'>
              <button
                className='w-[100%] h-[100%] font-[500]'
                onClick={() => handleRemoveFromBag()}
              >
                Remove from Bag
              </button>
            </div>
          )}

          <div className='sm:w-full w-[50%] h-[50px] rounded-md overflow-hidden border-[1px] border-[#00516e] transition-all duration-300 bg-[#00516e] text-[white] hover:bg-[#073c50]'>
            <button
              className='w-[100%] h-[100%]'
              onClick={() => handleAddToBagAndCheckout()}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='flex-1 pl-[50px] sm:pl-2'>
        <div className='mb-3 sm:hidden'>
          <Breadcrumbs separator='›' aria-label='breadcrumb'>
            {breadcrumbs}
          </Breadcrumbs>
        </div>
        <div className='flex flex-col mb-3 sm:mt-6'>
          <span className='text-[22px] font-medium leading-[35px] sm:text-[18px] sm:leading-6'>
            {data?.data?.name}
          </span>
          <span className='pt-2 sm:text-[16px] sm:leading-6 sm:font-bold'>
            By {data?.data?.brand}
          </span>
        </div>
        <div className='mb-3'>
          <Rating rating='4' review='61' />
        </div>
        <hr className='mb-3' />
        <div className='flex items-center gap-3 mb-5'>
          <span className='font-semibold text-[20px]'>
            {formatCurrency(data?.data?.price)}
          </span>
          {data?.data?.discount_price !== 0 && (
            <span className='flex gap-2'>
              <span className='text-[15px] line-through'>
                {formatCurrency(
                  +data?.data?.price + data?.data?.discount_price
                )}
              </span>
              <span className='text-[15px] text-[#ff905a] font-semibold'>
                (
                {getDiscountPercentage(
                  data?.data?.price,
                  data?.data?.discount_price
                )}
                % OFF)
              </span>
            </span>
          )}
        </div>
        <div
          className='mb-5 sm:text-[14px]'
          dangerouslySetInnerHTML={{ __html: data?.data?.description }}
        ></div>
        <div className='mt-[40px]'>
          <Review data={commentData} onClick={openModal} />
        </div>
      </div>
      <ReviewModal
        isOpen={isOpen}
        closeModal={closeModal}
        productId={productId}
        onSave={handleSaveUserComment}
      />
    </div>
  );
}

export default ProductDetail;
