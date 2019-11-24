import _ from "lodash";
import React, { useContext, useState } from "react";
import { TextField, Badge } from "@material-ui/core";
import StoreContext from "../context/StoreContext";
import OrderDialog from "./OrderDialog";
import Footer from "./Footer";
import EditIcon from "@material-ui/icons/EditOutlined";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import BasketIcon from "@material-ui/icons/ShoppingBasketRounded";
import Background from "../assets/pizzaDesktop.jpg";
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
  width: 50%;
  font-size: 20px;
  text-align: justify;
  text-justify: inter-word;
  white-space: nowrap;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;
const StyledTDataIcons = styled.td`
  width: 15%;
  text-align: right;
  text-justify: inter-word;
  white-space: nowrap;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const StyledTDMiddle = styled.td`
  width: 20%;
  font-size: 20px;
  text-align: right;
  text-justify: inter-word;
  white-space: nowrap;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export default function Drinks() {
  const tableContainerStyle = {
    marginTop: "40px",
    maxHeight: 750,
    overflow: "auto",
    background: "white",
    opacity: 0.7,
    borderRadius: "20px"
  };

  const StyledTable = styled.table`
    border-collapse: separate;
    border-spacing: 30px;
    @media only screen and (max-width: 1000px) {
      border-spacing: 7px;
    }
  `;

  const { products } = useContext(StoreContext);
  const [isEditing, setEditing] = useState(false);
  const [_grouped_mod, setGroupMod] = useState<any>({});
  const context = useContext(StoreContext);

  const beverages: any = products.find((it: any) => it.type === "italok");

  if (!_.isPlainObject(beverages) || !Array.isArray(beverages.items)) {
    return null;
  }

  const grouped = beverages.items.reduce((prev: any, curr: any) => {
    if (Array.isArray(prev[curr.type])) {
      return { ...prev, [curr.type]: [...prev[curr.type], curr] };
    }
    return { ...prev, [curr.type]: [curr] };
  }, {});

  const startEdit = async () => {
    const _edit: any = [];
    Object.keys(grouped).forEach(it => {
      _edit.push({ name: it, items: grouped[it] });
    });
    setEditing(true);
    setGroupMod(JSON.parse(JSON.stringify(_edit)));
  };

  const stopEdit = async () => {
    setEditing(false);
    const data = await fetch("https://api.cognityv.com/open/bibione/set_test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(_grouped_mod)
    });
    const result = await data.json();
    console.log(result);
  };

  const renderNormal = () => {
    return Object.keys(grouped).map((type: string) => {
      const res = [];
      res.push(
        <thead>
          <tr>
            <StyledTData
              style={{
                backgroundColor: "white",
                color: "forestgreen",
                fontWeight: "bold",
                fontSize: 24
              }}
            >
              {type}
            </StyledTData>
            <StyledTData style={{ backgroundColor: "white" }} />
            <StyledTDataIcons style={{ backgroundColor: "white" }}>
              <EditIcon
                style={{ cursor: "pointer", color: "forestgreen" }}
                onClick={() => {
                  if (isEditing) {
                    stopEdit();
                  } else {
                    startEdit();
                  }
                }}
              />
            </StyledTDataIcons>
          </tr>
        </thead>
      );
      Object.values(grouped[type]).forEach((item: any) => {
        res.push(
          <tbody>
            <tr key={item.id}>
              <StyledTData style={{ color: "black", fontWeight: "bold" }}>
                {item.name}
              </StyledTData>
              <StyledTDMiddle style={{ color: "black", fontWeight: "bold" }}>
                {item.price} Ft
              </StyledTDMiddle>
              <StyledTDataIcons>
                {!item.noDelivery && <OrderDialog item={item} />}
              </StyledTDataIcons>
            </tr>
          </tbody>
        );
      });
      return res;
    });
  };

  const renderEdit = () => {
    return _grouped_mod.map((group: any, index: number) => {
      const res = [];
      res.push(
        <thead>
          <tr>
            <td
              style={{
                backgroundColor: "dimgrey ",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold"
              }}
            >
              <TextField
                type="text"
                value={_.isString(group.name) ? group.name : ""}
                onChange={event =>
                  setGroupMod(
                    _.set(
                      JSON.parse(JSON.stringify(_grouped_mod)),
                      [index, "name"],
                      event.target.value
                    )
                  )
                }
              />
            </td>

            <td style={{ backgroundColor: "dimgrey" }} />
            <td style={{ backgroundColor: "dimgrey" }} />
            <td style={{ backgroundColor: "dimgrey" }}>
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (isEditing) {
                    stopEdit();
                  } else {
                    startEdit();
                  }
                }}
              />
            </td>
          </tr>
        </thead>
      );
      group.items.forEach((item: any) => {
        res.push(
          <tbody>
            <tr key={item.id}>
              <StyledTData>
                <TextField type="text" defaultValue={item.name} />
              </StyledTData>
              <div>
                <StyledTDMiddle>
                  <TextField type="text" defaultValue={item.price} />
                </StyledTDMiddle>
              </div>
              <StyledTDataIcons>
                <OrderDialog item={item} />
              </StyledTDataIcons>
            </tr>
          </tbody>
        );
      });
      return res;
    });
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

        <div style={tableContainerStyle}>
          <StyledTable>{isEditing ? renderEdit() : renderNormal()}</StyledTable>
        </div>
      </Content>
      <Footer />
    </ImgContainer>
  );
}
