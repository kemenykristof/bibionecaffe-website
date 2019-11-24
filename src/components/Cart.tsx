import React, { useContext } from "react";
import BasketIcon from "@material-ui/icons/ShoppingBasketRounded";
import StoreContext from "../context/StoreContext";
import { Fab, Badge } from "@material-ui/core";
import Remove from "@material-ui/icons/Remove";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import Background from "../assets/pizzaDesktop.jpg";
import NavMobile from "./NavMobile";
import AddIcon from "@material-ui/icons/Add";
import Footer from "./Footer";

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ImgContainer = styled.div`
  height: 100vh;
  background-size: cover;
  background-repeat: inherit;
  background-position: top center;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 36px;
  right: 60px;
  color: white;
  cursor: pointer;
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

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 40px;
`;

const StyledBasket = styled(BasketIcon)`
  color: white;
  cursor: pointer;
  align-items: center;
`;

const StyledCartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  background: white;
  text-align: center;
  margin: auto;
  opacity: 0.9;
  width: 90%;
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const StyledBottomContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const StyledPriceBox = styled.div`
  background-color: forestgreen;
  color: white;
  padding: 15px;
  width: inherit;
  margin: auto;
  border-radius: 5px;
`;

const StyledOrderButton = styled.div`
  background-color: steelblue;
  color: white;
  padding: 15px;
  margin: auto;
  cursor: pointer;
  width: inherit;
  border-radius: 5px;
`;

interface Props {}

export default function Cart(props: Props) {
  const store = useContext(StoreContext);
  const context = useContext(StoreContext);

  return (
    <ImgContainer
      style={{
        backgroundImage: `url(${Background})`
      }}
    >
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
        {store.cart.length <= 0 && (
          <h1 style={{ textAlign: "center", color: "white" }}>
            <BasketIcon fontSize="large" />{" "}
            <span style={{ textShadow: "1px 1px #b0b0b0" }}>
              {" "}
              Az Ön kosara üres
            </span>
          </h1>
        )}
        <div
          style={{
            overflow: "auto",
            maxHeight: 500
          }}
        >
          <ul
            style={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            {store.cart.map(item => (
              <StyledCartContainer>
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    listStyle: "none",
                    padding: 15
                  }}
                >
                  <div>
                    <strong
                      style={{ paddingRight: "10px", paddingLeft: "10px" }}
                    >
                      {item.name}
                    </strong>{" "}
                    - {item.price}Ft
                    {/*                     {item.type === 'Frissensültek' && <span>Választott köret: </span>}
                     */}{" "}
                    <strong
                      style={{ paddingRight: "10px", paddingLeft: "10px" }}
                    >
                      db: {item.quantity}
                    </strong>
                    <Fab
                      onClick={() => context.addProductToCart(item)}
                      size="small"
                      color="secondary"
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>
                    <Fab
                      onClick={() => store.removeProductFromCart(item.id)}
                      size="small"
                      color="primary"
                      aria-label="remove"
                    >
                      <Remove />
                    </Fab>
                  </div>
                </li>
              </StyledCartContainer>
            ))}
          </ul>
        </div>
        {context.cart.length !== 0 && (
          <StyledBottomContainer>
            <div style={{ marginBottom: 10 }}>
              <StyledPriceBox>
                Rendelés összege:
                {store.cart.reduce((count, curItem) => {
                  return count + curItem.quantity * curItem.price;
                }, 0)}
                Ft
              </StyledPriceBox>
              <NavLink style={{ textDecoration: "none" }} to="/rendeles">
                <StyledOrderButton>TOVÁBB A RENDELÉSHEZ</StyledOrderButton>
              </NavLink>
            </div>
          </StyledBottomContainer>
        )}
      </Content>
      <Footer />
    </ImgContainer>
  );
}
