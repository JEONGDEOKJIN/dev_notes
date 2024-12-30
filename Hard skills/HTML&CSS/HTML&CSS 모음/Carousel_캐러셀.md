
## 참고 코드 

- 간단한 캐러셀의 경우, 여기면 충분할 것 같다. (https://swiperjs.com/demos#navigation)
![Image](https://i.imgur.com/trM7AUU.png)

- https://swiperjs.com/react (#여기 참고)
- 해당 예시의 샘플 코드 https://codesandbox.io/p/devbox/swiper-react-navigation-2k3jk3?file=%2Fsrc%2FApp.jsx%3A8%2C1 (#241206 현재 정상 작동)




### jsx 코드 
```jsx
"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const MyCarousel = () => {
  return (
    <>
    {/* 세부 css 는 global.css 에서 조절 */}
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

export default MyCarousel;

```

### 기본 CSS
```CSS
/* swiper CSS  */
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #e2e2e2;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```