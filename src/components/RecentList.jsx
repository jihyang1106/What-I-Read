import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './recentList.css';

// import required modules
import { Pagination } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { recentListCreate } from '../store/module/Book';

export default function RecentList() {
  const Dispatch = useDispatch();
  const recentListState = useSelector((state) => state.Book.recentList);

  async function MainPageBookListRender() {
    await axios({
      method: 'get',
      url: 'aladin/ttb/api/ItemList.aspx?QueryType=Bestseller&MaxResults=10&start=1&cover=MidBig&SearchTarget=Book&output=js&Version=20131101&ttbkey=ttb96tmdqh1639001',
    }).then((data) => {
      Dispatch(recentListCreate(data.data.item));
    });
  }

  useEffect(() => {
    MainPageBookListRender();
  }, []);

  return (
    <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 30px' }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {recentListState.map((el) => (
          <SwiperSlide key={el.itemId}>
            <img src={el.cover} alt="" />
            {/* <p>{el.title.split('-')[0]}</p> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
