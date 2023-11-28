import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchSingleCoin } from "../redux/cryptoSlice";
import { useParams } from "react-router-dom";
import { Box, LinearProgress, Typography } from "@mui/material";
import styled from "styled-components";
import CoinInfo from "../components/CoinInfo/CoinInfo";
import ReactHtmlParser from "html-react-parser";
import { numberWithCommas } from "../helpers/numberWithCommas";

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CoinImage = styled.img`
  height: 200px;
  margin-bottom: 20px;
`;

const SideBar = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  border-right: "2px solid grey";

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const MarketInfo = styled.div``;

const Coin = () => {
  const { singleCoin, singleCoinStatus, currentCurrency, currencySymbol } =
    useSelector((state: RootState) => state.cryptoReducer);
  const dispatch = useAppDispatch();

  const params = useParams();

  useEffect(() => {
    if (params.id) dispatch(fetchSingleCoin(params.id));
  }, []);
  function truncateAfterSecondDot(sentence: string | undefined) {
    if (!sentence) return;

    const firstDotIndex = sentence.indexOf(". ");
    const secondDotIndex = sentence.indexOf(". ", firstDotIndex + 1);

    if (secondDotIndex !== -1) {
      // Найдены две точки, обрезаем строку после второй точки
      return sentence.slice(0, secondDotIndex + 1);
    }

    // Если не найдено двух точек, возвращаем исходную строку
    return sentence;
  }
  return singleCoinStatus === "pending" || singleCoinStatus === "idle" ? (
    <LinearProgress sx={{ backgroundColor: "gold" }} />
  ) : (
    <Container>
      <SideBar>
        <CoinImage src={singleCoin?.image.large} alt="" />
        <Typography variant="h3" sx={{ mb: "20px", fontWeight: 500 }}>
          {singleCoin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ maxWidth: 400, textAlign: "center", p: "15px 25px 0" }}
        >
          {ReactHtmlParser(
            truncateAfterSecondDot(singleCoin?.description.en) as string
          )}
        </Typography>
          <Box display={'flex'}>
            <Typography variant="h5" sx={{ mb: "20px", fontWeight: 700 }}>Rank: {singleCoin?.market_cap_rank}</Typography>
            {/* <Typography variant="h5" sx={{ mb: "20px", fontWeight: 700 }}>Current Price: {currencySymbol} {numberWithCommas(singleCoin?.market_data.current_price[currentCurrency.toLowerCase()])}</Typography> */}

          </Box>
      </SideBar>

      <CoinInfo />
    </Container>
  );
};

export default Coin;
