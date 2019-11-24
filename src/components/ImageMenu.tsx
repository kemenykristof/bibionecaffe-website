import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Footer from "./Footer";
import ProductShowCase from "./ProductShowCase";
import NavMobile from "./NavMobile";
import { Badge } from "@material-ui/core";
import StoreContext from "../context/StoreContext";
import BasketIcon from "@material-ui/icons/ShoppingBasketRounded";
import desktopImage from "../assets/pizzaDesktop.jpg";
import mobileImage from "../assets/pizzaMobile.jpg";

const ImgContainer = styled.div`
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
`;

const CenterText = styled.div`
  font-size: 3rem;
  font-weight: bold;
  position: absolute;
  color: white;
  text-shadow: 1px 1px #b0b0b0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  @media only screen and (max-width: 1000px) {
    font-size: 1.5rem;
  }
`;
const LogoStyle = styled.img`
  position: absolute;
  top: 8px;
  left: 16px;
  cursor: pointer;
  max-width: 90px;
  height: auto;
  @media only screen and (max-width: 650px) {
    max-width: 70px;
  }
`;

const StyledBasket = styled(BasketIcon)`
  color: white;
  cursor: pointer;
  align-items: center;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 36px;
  right: 60px;
  color: white;
  cursor: pointer;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px;
`;
const StyledText = styled.span`
  font-size: 25px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    color: brown;
  }
  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default function ImageMenu() {
  const context = useContext(StoreContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl = window.innerWidth >= 650 ? desktopImage : mobileImage;

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  return (
    <div>
      <ImgContainer style={{ backgroundImage: `url(${imageUrl})` }}>
        <Content>
          <Link to="/">
            <LogoStyle src={require("../assets/bibione.png")} alt="logo" />
          </Link>

          <StyledNavigation>
            <StyledNavLink to="/egeszseges">
              <StyledText>Egészséges ételek</StyledText>
            </StyledNavLink>
            <StyledNavLink to="/pizza">
              <StyledText>Pizza</StyledText>
            </StyledNavLink>
            <StyledNavLink to="/etlap">
              <StyledText>Étlap</StyledText>
            </StyledNavLink>
            <NavMobile />
            <StyledNavLink to="/italok">
              <StyledText>Itallap</StyledText>
            </StyledNavLink>
            <StyledNavLink to="/kapcsolat">
              <StyledText>Kapcsolat</StyledText>
            </StyledNavLink>
          </StyledNavigation>

          <CenterText>
            <h1>BIBIONE CAFFÉ</h1>
          </CenterText>
          <StyledLink to="/kosar">
            <Badge
              color="error"
              badgeContent={context.cart.reduce((count, curItem) => {
                return count + curItem.quantity;
              }, 0)}
            >
              <StyledBasket fontSize="large" />
            </Badge>
          </StyledLink>
        </Content>
      </ImgContainer>
      <ProductShowCase />
      <Footer />
    </div>
  );
}
