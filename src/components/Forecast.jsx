import React, { useContext } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import AppContext from "../provider/appContext";
import Card from "./Card";
import Loader from "./Loader";
import Temperature from "./Temperature";

function Forecast() {
  const { app } = useContext(AppContext);
  if (!app.weather) {
    return <Loader />;
  }

  const { daily } = app.weather;
  return (
    <div>
      <Swiper
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
      {daily.map((weather, index) => {
        let date = new Date(weather.dt * 1000);
        const dayFormatter = Intl.DateTimeFormat('en-US', {
          weekday: "long",
          timeZone: weather.timezone,
        });
        return (
          <SwiperSlide key={index + Math.random().toString()}>
            <Card key={index} className="forecast-card">
              <div className="forecast-day">
                {dayFormatter.format(date)}</div>
              <img
                src={`/weather_icons/${weather.weather[0].icon}.png`}
                alt="icon"
                width={100}
              />
              <div className="forecast-description">
                {weather.weather[0].description}
              </div>
              <div className="minmax-temp">
                <Temperature temperature={weather.temp.max} />°
                <span>
                  <Temperature temperature={weather.temp.min} />°
                </span>
              </div>
            </Card>
          </SwiperSlide>          
        );
      })}
      </Swiper>
    </div>
  );
}

export default Forecast;
