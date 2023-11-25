import React, { useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchTrending } from "../../redux/cryptoSlice";
import { useSelector } from "react-redux";
import { CurrencyType } from "../../types/currencyType";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import CarouselItem from "../CarouselItem/CarouselItem";

const Carousel = () => {
  const dispatch = useAppDispatch();
  const currency = useSelector(
    (state: RootState) => state.cryptoReducer.currentCurrency
  );
  const currencySymbol = useSelector(
    (state: RootState) => state.cryptoReducer.currencySymbol
  );
  const trending = useSelector(
    (state: RootState) => state.cryptoReducer.trendingCoins
  );
  const status = useSelector(
    (state: RootState) => state.cryptoReducer.trendingCoinsStatus
  );

  useEffect(() => {
    
    dispatch(fetchTrending(currency as CurrencyType));
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    920:{
        items:4
    }
  };

  const items = trending.map((coin) => (
    <Link to={`/coins/${coin.id}`}>
      <CarouselItem item={coin} currencySymbol={currencySymbol} />
    </Link>
  ));

  return status === "pending" ? (
    <h1>Loading...</h1>
  ) : (
    <AliceCarousel
      infinite
      mouseTracking
      autoPlayInterval={2000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      autoPlay
      responsive={responsive}
      items={items}
      
    />
  );
};

export default Carousel;
