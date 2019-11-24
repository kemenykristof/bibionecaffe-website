import _ from "lodash";
import React, { useContext} from "react";
import { Badge } from "@material-ui/core";
import StoreContext from "../context/StoreContext";
import PizzaOrderDialog from "./PizzaOrderDialog";
import Footer from "./Footer";
import styled from "styled-components";
import Background from "../assets/pizzaDesktop.jpg";
import { Link, NavLink } from "react-router-dom";
import BasketIcon from "@material-ui/icons/ShoppingBasketRounded";
import NavMobile from "./NavMobile";

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px;
  @media only screen and (max-width: 1000px) {
    padding: 0px;
  }
`;

const ImgContainer = styled.div`
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
`;

const StyledBasket = styled(BasketIcon)`
  color: white;
  cursor: pointer;
  align-items: center;
  @media only screen and (max-width: 450px) {
    font-size: 5px;
  }
`;

const StyledTableContainer = styled.div`
  margin-top: 40px;
  max-height: 750px;
  overflow: auto;
  background: white;
  opacity: 0.7;
  border-radius: 20px;
`;

const StyledTableCellData = styled.td`
  background-color: white;
  color: black;
  font-size: 20px;
  font-weight: bold;
  @media only screen and (max-width: 450px) {
    font-size: 8px;
    max-width: 400px;
    padding-left: 0px;
    padding-top: 0px;
    padding-right: 0px;
  }
`;

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 30px;
  @media only screen and (max-width: 450px) {
    border-spacing: 2px;
  }
`;
const StyledTableCellHeader = styled.td`
  background-color: white;
  color: forestgreen;
  font-size: 22px;
  font-weight: bold;
  @media only screen and (max-width: 450px) {
    font-size: 8px;
  }
`;

export default function Pizza() {
  const { products } = useContext(StoreContext);
  const pizzaList: any = products.find((it: any) => it.type === "pizzak");
  const context = useContext(StoreContext);

  if (!_.isPlainObject(pizzaList) || !Array.isArray(pizzaList.items)) {
    return null;
  }

  const grouped = pizzaList.items.reduce((prev: any, curr: any) => {
    if (Array.isArray(prev[curr.type])) {
      return { ...prev, [curr.type]: [...prev[curr.type], curr] };
    }
    return { ...prev, [curr.type]: [curr] };
  }, {});

  console.log(grouped);

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
        <StyledTableContainer>
          <StyledTable>
            {Object.keys(grouped).map((type: string) => {
              const result = [];
              result.push(
                <thead>
                  <tr>
                    <StyledTableCellHeader>{type}</StyledTableCellHeader>
                    <StyledTableCellHeader>{"25cm"}</StyledTableCellHeader>
                    <StyledTableCellHeader>{"30cm"}</StyledTableCellHeader>
                    <StyledTableCellHeader>{"35cm"}</StyledTableCellHeader>
                    <StyledTableCellHeader>{"50cm"}</StyledTableCellHeader>
                    <StyledTableCellHeader></StyledTableCellHeader>
                  </tr>
                </thead>
              );
              Object.values(grouped[type]).forEach((item: any) => {
                result.push(
                  <tbody>
                    <tr key={item.id}>
                      <StyledTableCellData>
                        <strong>{item.name}</strong>
                        <strong>
                          <p style={{ color: "steelblue" }}>{item.details}</p>
                        </strong>
                      </StyledTableCellData>
                      {Array.isArray(item.price) &&
                        item.price.map((it: any, index: number) => (
                          <StyledTableCellData key={index}>
                            {it.value}
                            Ft
                          </StyledTableCellData>
                        ))}
                      <StyledTableCellData>
                        <PizzaOrderDialog item={item} />
                      </StyledTableCellData>
                    </tr>
                  </tbody>
                );
              });
              return result;
            })}
          </StyledTable>
        </StyledTableContainer>
      </Content>
      <Footer />
    </ImgContainer>
  );
}
