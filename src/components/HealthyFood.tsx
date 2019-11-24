import _ from "lodash";
import React, { useContext} from "react";
import { Badge } from "@material-ui/core";
import StoreContext from "../context/StoreContext";
import OrderDialog from "./OrderDialog";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import BasketIcon from "@material-ui/icons/ShoppingBasketRounded";
import Background from "../assets/pizzaDesktop.jpg";
import Footer from "./Footer";
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
`;
const StyledTData = styled.td`
  width: 30%;
  padding: 2px;
  font-size: 20px;
  text-align: justify;
  text-justify: inter-word;
`;
const StyledTDataIcons = styled.td`
  width: 5%;
  padding: 2px;
  font-size: 20px;
  text-align: center;
  text-justify: inter-word;
`;

const StyledTDMiddle = styled.td`
  width: 30%;
  padding: 2px;
  font-size: 20px;
  text-align: right;
  text-justify: inter-word;
`;

export default function HealthyFood() {
  const { products } = useContext(StoreContext);
  const healthy_food: any = products.find(
    (it: any) => it.type === "egeszseges_etelek"
  );
  const context = useContext(StoreContext);

  if (!_.isPlainObject(healthy_food) || !Array.isArray(healthy_food.items)) {
    return null;
  }

  const grouped = healthy_food.items.reduce((prev: any, curr: any) => {
    if (Array.isArray(prev[curr.type])) {
      return { ...prev, [curr.type]: [...prev[curr.type], curr] };
    }
    return { ...prev, [curr.type]: [curr] };
  }, {});

  const tableContainerStyle = {
    marginTop: "40px",
    maxHeight: 750,
    overflow: "auto",
    background: "white",
    opacity: 0.7,
    borderRadius: "20px"
  };

  const tableStyle = {
    paddingLeft: "30px",
    paddingTop: "30px"
  };

  const tableCellStyle = {
    backgroundColor: "white",
    color: "forestgreen",
    fontSize: "24px",
    fontWeight: "bold" as "bold"
  };

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
        </StyledNavigation>

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            {Object.keys(grouped).map((type: string) => {
              const res = [];
              res.push(
                <th>
                  <tr>
                    <StyledTData style={tableCellStyle}>{type}</StyledTData>
                    <StyledTData
                      style={{
                        backgroundColor: "white",
                        color: "forestgreen",
                        fontWeight: "bold"
                      }}
                    />
                    <StyledTDataIcons
                      style={{
                        backgroundColor: "white",
                        color: "forestgreen",
                        fontWeight: "bold"
                      }}
                    ></StyledTDataIcons>
                  </tr>
                </th>
              );
              Object.values(grouped[type]).forEach((item: any) => {
                res.push(
                  <tbody>
                    <tr key={item.id}>
                      <StyledTData
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        <strong>{item.name}</strong>
                        <p style={{ color: "steelblue", fontSize: "14px" }}>
                          {item.content}
                        </p>
                      </StyledTData>
                      <StyledTDMiddle
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        {item.price} Ft
                      </StyledTDMiddle>
                      <StyledTDataIcons style={{ color: "white" }}>
                        <OrderDialog item={item} />
                      </StyledTDataIcons>
                    </tr>
                  </tbody>
                );
              });
              return res;
            })}
          </table>
        </div>
      </Content>
      <Footer />
    </ImgContainer>
  );
}
