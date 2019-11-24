import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { TextField, Badge } from '@material-ui/core';
import StoreContext from '../context/StoreContext';
import OrderDialog from './OrderDialog';
import Footer from './Footer';
import EditIcon from '@material-ui/icons/EditOutlined';
import styled from 'styled-components';
import Background from '../assets/pizzaDesktop.jpg';
import { Link, NavLink } from 'react-router-dom';
import BasketIcon from '@material-ui/icons/ShoppingBasketRounded';
import NavMobile from './NavMobile';

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
align-items:center;
  `;

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 30px;
  @media only screen and (max-width: 600px) {
    border-spacing: 25px;
  }
`;

const StyledTData = styled.td`
  width: 40%;
  font-size: 20px;
  text-align: justify;
  text-justify: inter-word;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;
const StyledTDataIcons = styled.td`
  width: 3%;
  text-align: right;
  text-justify: inter-word;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const StyledTDMiddle = styled.td`
  width: 40%;
  text-align: right;
  text-justify: inter-word;
  white-space: nowrap;
  @media only screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

export default function Meals() {
  const { products } = useContext(StoreContext);
  const context = useContext(StoreContext);
  const etlap: any = products.find((it: any) => it.type === 'etlap');
  const [isEditing, setEditing] = useState(false);

  if (!_.isPlainObject(etlap) || !Array.isArray(etlap.items)) {
    return null;
  }

  const grouped = etlap.items.reduce((prev: any, curr: any) => {
    if (Array.isArray(prev[curr.type])) {
      return { ...prev, [curr.type]: [...prev[curr.type], curr] };
    }
    return { ...prev, [curr.type]: [curr] };
  }, {});

  return (
    <ImgContainer
      style={{
        backgroundImage: `url(${Background})`
      }}
    >
      <Content>
        <Link to="/">
          <LogoStyle src={require('../assets/bibione.png')} alt="logo" />
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
        <div
          style={{
            marginTop: '40px',
            maxHeight: 750,
            overflow: 'auto',
            background: 'white',
            opacity: 0.7,
            borderRadius: '20px'
          }}
        >
          <StyledTable>
            {Object.keys(grouped).map((type: string) => {
              const res = [];
              res.push(
                <thead>
                  <tr>
                    {isEditing ? (
                      <StyledTData style={{ backgroundColor: 'white ', color: 'forestgreen', fontWeight: 'bold' }}>
                        <TextField type="text" defaultValue={type} />
                      </StyledTData>
                    ) : (
                      <StyledTData style={{ backgroundColor: 'white', color: 'forestgreen', fontWeight: 'bold' }}>
                        <strong>{type}</strong>
                      </StyledTData>
                    )}
                    <StyledTData style={{ backgroundColor: 'white' }} />
                    <StyledTDataIcons style={{ backgroundColor: 'white' }}>
                      <EditIcon style={{ cursor: 'pointer', color: 'forestgreen' }} onClick={() => setEditing(!isEditing)} />
                    </StyledTDataIcons>
                  </tr>
                </thead>
              );
              Object.values(grouped[type]).forEach((item: any) => {
                res.push(
                  <tbody>
                    <tr key={item.id}>
                      {isEditing ? (
                        <StyledTData style={{ color: 'black', fontWeight: 'bold' }}>
                          <TextField type="text" defaultValue={item.name} />
                        </StyledTData>
                      ) : (
                        <StyledTData style={{ color: 'black', fontWeight: 'bold' }}>{item.name}</StyledTData>
                      )}
                      {isEditing ? (
                        <StyledTDMiddle style={{ color: 'black', fontWeight: 'bold' }}>
                          <TextField type="text" defaultValue={item.price} />
                        </StyledTDMiddle>
                      ) : (
                        <StyledTDMiddle style={{ color: 'black', fontWeight: 'bold' }}>{item.price} Ft</StyledTDMiddle>
                      )}
                      <StyledTDataIcons>
                        <OrderDialog item={item} />
                      </StyledTDataIcons>
                    </tr>
                  </tbody>
                );
              });
              return res;
            })}
          </StyledTable>
        </div>
      </Content>
      <Footer />
    </ImgContainer>
  );
}
