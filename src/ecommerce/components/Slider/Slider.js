import React, { useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const slideRef = useRef();

  const sliderData = [
    {
      id: '1',
      imageUrl:
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2',
      imageUrl:
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    // {
    //   id: '3',
    //   imageUrl:
    //     'https://img.freepik.com/free-photo/multi-colored-textiles-stacked-vibrant-arrangement-generated-by-ai_188544-33011.jpg?t=st=1693648838~exp=1693652438~hmac=1dc1d13587f96a825bb3735864a1e6caefed9c63e61ff7196a18a4a274888cca&w=1380',
    // },
    // {
    //   id: '4',
    //   imageUrl:
    //     'https://res.cloudinary.com/dpc9y8njo/image/upload/v1693649957/e-comm/kvia3v45ybi8kbijzvy2.jpg',
    // },
    // {
    //   id: '1',
    //   imageUrl:
    //     'https://res.cloudinary.com/dpc9y8njo/image/upload/v1693649870/e-comm/q3v0qkmhr15p6jzw6gv7.jpg',
    // },
    // {
    //   id: '2',
    //   imageUrl:
    //     'https://res.cloudinary.com/dpc9y8njo/image/upload/v1693649753/e-comm/isfecg4bv6ccxnsgnib4.jpg',
    // },
    // {
    //   id: '3',
    //   imageUrl:
    //     'https://img.freepik.com/free-photo/multi-colored-textiles-stacked-vibrant-arrangement-generated-by-ai_188544-33011.jpg?t=st=1693648838~exp=1693652438~hmac=1dc1d13587f96a825bb3735864a1e6caefed9c63e61ff7196a18a4a274888cca&w=1380',
    // },
    // {
    //   id: '4',
    //   imageUrl:
    //     'https://res.cloudinary.com/dpc9y8njo/image/upload/v1693649957/e-comm/kvia3v45ybi8kbijzvy2.jpg',
    // },
  ];

  const NO_OF_SLIDES = sliderData.length;

  const handleSlideChange = (type) => {
    let localSlide = currentSlide;
    if (type === 'left') {
      localSlide--;
      if (localSlide < 1) {
        localSlide = NO_OF_SLIDES;
      }
    } else if (type === 'right') {
      localSlide++;
      if (localSlide > NO_OF_SLIDES) {
        localSlide = 1;
      }
    }
    setCurrentSlide(localSlide);
    slideRef.current.style.translate = `${(localSlide - 1) * -100}vw`;
  };

  return (
    <div className='h-[400px] overflow-hidden relative sm:h-[300px]'>
      <div
        ref={slideRef}
        className='flex w-max h-[100%] transition-[translate] duration-500'
      >
        {sliderData &&
          sliderData.map((slide) => (
            <div className='w-[100vw] h-[100%] relative' key={slide.id}>
              <div
                className='absolute top-0 left-0 w-[100%] h-[100%] bg-no-repeat bg-cover'
                style={{ backgroundImage: `url(${slide.imageUrl})` }}
              ></div>
            </div>
          ))}
      </div>
      <button
        className='absolute left-0 top-0 bottom-0 z-100 bg-[#ffffff2e] w-[50px] focus:outline-none'
        onClick={() => handleSlideChange('left')}
      >
        <ArrowBackIosNewIcon />
      </button>
      <button
        className='absolute right-0 top-0 bottom-0 z-100 bg-[#ffffff2e] w-[50px] focus:outline-none'
        onClick={() => handleSlideChange('right')}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
}

export default Slider;
