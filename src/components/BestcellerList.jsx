import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './list.css';

// import required modules
import { Pagination } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { bestcellerListCreate } from '../store/module/Book';

export default function BestcellerList() {
  const Dispatch = useDispatch();
  const bestcellerListState = useSelector((state) => state.Book.bestcellerList);

  async function MainPageBookListRender() {
    await axios({
      method: 'get',
      url: 'aladin/ttb/api/ItemList.aspx?QueryType=Bestseller&MaxResults=10&start=1&cover=MidBig&SearchTarget=Book&output=js&Version=20131101&ttbkey=ttb96tmdqh1639001',
    }).then((data) => {
      Dispatch(bestcellerListCreate(data.data.item));
    });
  }

  useEffect(() => {
    MainPageBookListRender();
  }, []);

  return (
    <div>
      <h2>베스트셀러</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          440: {
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
        {bestcellerListState.map((el) => (
          <SwiperSlide key={el.itemId}>
            <img src={el.cover} alt="" />
            {/* <p>{el.title.split('-')[0]}</p> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
