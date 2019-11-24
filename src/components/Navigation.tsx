import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import BasketIcon from '@material-ui/icons/ShoppingBasketRounded';
import { Badge } from '@material-ui/core';
import StoreContext from '../context/StoreContext';

const context = useContext(StoreContext);

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

const StyledLink = styled(Link)`
  position: absolute;
  top: 36px;
  right: 60px;
  color: white;
  cursor: pointer;
    `;

export default function Navigation() {
  return (
    <div>
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
    </div>
  );
}
