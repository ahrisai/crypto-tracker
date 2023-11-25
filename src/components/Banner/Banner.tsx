import React from "react";
import styled from "styled-components";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

const BannerContainer = styled.div`
  background-image: url("/images/bannerBG.jpg");
    height: 500px;
 `

const Tagline= styled.div`
    display: "flex";
    height: "40%";
    flex-direction: column;
    justify-content: center;
    text-align: center;
  `
const CarouselContainer =styled.div`
    margin-top: 20px;
    height: "50%";
    display: flex;
    align-items: center;
    justify-content: center;
` 


const containerStyles = {
  height: 400,
  display: "flex",
  flexDirection: "column",
  textAlign:'center',
  paddingTop: 15,
};
const Banner = () => {
  return (
    <BannerContainer>
      <Container sx={containerStyles}>
        <Tagline>
        <Typography variant="h2" sx={{fontWeight:"bold", marginBottom:'15px'}}>
            Crypto Tracker
        </Typography>
        <Typography variant="subtitle2" sx={{color:'darkgrey',textTransform:"capitalize"}}>
        Get all the Info regarding your favorite Crypto Currency
        </Typography>
        </Tagline>
        <CarouselContainer>
            <Carousel/>
        </CarouselContainer>
      </Container>
    </BannerContainer>
  );
};

export default Banner;
