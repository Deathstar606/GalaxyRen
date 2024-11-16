import React from "react";
import { CardImg } from "reactstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import im1 from "../images/Hero Slider/Feature-How-to-plan-a-house-renovation.jpg"
import im2 from "../images/Hero Slider/1000_F_872277172_W2JEB6BdYWdj1leBFEcO8heieBIqaN68.jpg"
import im3 from "../images/Hero Slider/1695810787-img2-banner-blog-1a.jpg"

const HeroSec = () => {

    return(
      <div>
        <Swiper
          autoplay={{
            delay: 4800,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
          speed={2500}
        >
          <SwiperSlide className='d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh' }}>
            <CardImg src={im1} style={{ height: '100vh', width: '100%', objectFit: 'cover' }}/>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
              <h1 className="mb-1 pb-3 text-center" style={{fontSize: "clamp(44px, 4vw, 70px)"}}>This is a demo head</h1>
              <h6 className='mb-3' style={{fontSize: "clamp(18px, 1vw, 40px)"}}>This is a demo sub header</h6>
              <div className="butt" style={{fontSize: "21px", color: "black"}} /* onClick={handleClick} */>
                Demo Button
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh' }}>
            <CardImg src={im2} style={{ height: '100vh', width: '100%', objectFit: 'cover' }}/>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
              <h1 className="mb-1 pb-3 text-center" style={{fontSize: "clamp(44px, 4vw, 70px)"}}>This is a demo head</h1>
              <h6 className='mb-3' style={{fontSize: "clamp(18px, 1vw, 40px)"}}>This is a demo sub header</h6>
              <div className="butt" style={{fontSize: "21px"}} /* onClick={handleClick} */>
                Demo Button
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className='d-flex justify-content-center align-items-center' style={{ position: 'relative', height: '100vh' }}>
            <CardImg src={im3} style={{ height: '100vh', width: '100%', objectFit: 'cover' }}/>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 p-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
              <h1 className="mb-1 text-white pb-3 text-center" style={{fontSize: "clamp(44px, 4vw, 70px)"}}>This is a demo head</h1>
              <h6 className='mb-3 text-white' style={{fontSize: "clamp(18px, 1vw, 40px)"}}>This is a demo sub header</h6>
              <div className="butt" style={{fontSize: "21px"}} /* onClick={handleClick} */>
                Demo Button
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
}

export default HeroSec;