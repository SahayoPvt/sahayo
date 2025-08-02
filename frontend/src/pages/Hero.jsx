import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const Hero = () => {
  return (
    <div className="mt-4">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        <div>
          <img src="https://pictures.kartmax.in/live/original/0x0/sites/aPfvUDpPwMn1ZadNKhP7/theme/Hellosummer-opt-1-WebBanner-968e5781-1a06-44b0-9185-8dfb4fc15d42.jpg"></img>
        </div>
        <div>
          <img src="https://pictures.kartmax.in/live/1351x476/outside/quality=6/sites/aPfvUDpPwMn1ZadNKhP7/banner_images/Highlander-cacdf85d-2e52-400d-88cc-a7c1375f0302.jpg" />
        </div>
        <div>
          <img src="https://pictures.kartmax.in/live/1351x476/outside/quality=6/sites/aPfvUDpPwMn1ZadNKhP7/banner_images/TokyoTalkies-6c0a466b-86e7-4998-8284-f270215feca3.jpg" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
