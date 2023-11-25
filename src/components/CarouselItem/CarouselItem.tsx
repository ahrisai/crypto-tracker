import { FC } from "react";
import styled from "styled-components";
import { Coin } from "../../types/CryptoTypes";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { numberWithCommas } from "../../helpers/numberWithCommas";



interface CarouselItemProps {
  item: Coin;
  currencySymbol: string;
}

const CarouselItem: FC<CarouselItemProps> = ({ item, currencySymbol }) => {
  const profit = item.price_change_percentage_24h >= 0;

  return (
    <Card variant="elevation" sx={{ bgcolor: "#333", margin: "0 30px" }}>
      <CardActionArea sx={{ padding: "15px" }}>
        <CardMedia
          component={"img"}
          height={"85px"}
          sx={{ objectFit: "contain" }}
          image={item.image}
        />
        <CardContent
          sx={{ textTransform: "uppercase", color: "#fff", fontSize: 18 }}
        >
          <span>{item.symbol}&nbsp;</span>
          <span
            style={{
              color: profit ? "green" : "red",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {profit && "+"}
            {item.price_change_percentage_24h.toFixed(2)}%
          </span>
          <p style={{ fontSize: 24 }}>
            {currencySymbol}&nbsp;{numberWithCommas(item.current_price)}
          </p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CarouselItem;
