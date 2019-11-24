import React, { useContext } from 'react';
import ClockIcon from '@material-ui/icons/WatchLaterOutlined';
import LocalPizza from '@material-ui/icons/LocalPizzaOutlined';
import PhoneIcon from '@material-ui/icons/PhoneEnabledRounded';
import Footer from './Footer';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Background from '../assets/pizzaDesktop.jpg';
import BasketIcon from '@material-ui/icons/ShoppingBasketRounded';
import { Badge } from '@material-ui/core';
import StoreContext from '../context/StoreContext';
import NavMobile from './NavMobile';

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px;
  margin: auto;
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
color: black;
cursor: pointer;
  `;

const StyledText = styled.span`
  font-size: 25px;
  font-weight: bold;
  margin-right: 40px;
  margin-left: 40px;
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

export default function ContactPage() {
  const context = useContext(StoreContext);

  return (
    <ImgContainer
      style={{
        backgroundImage: `url(${Background})`
      }}
    >
      <Content>
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
              width: 750,
              height: 'auto',
              margin: 'auto',
              background: 'white',
              borderRadius: 10,
              opacity: 0.55,
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px'
            }}
          >
            <div>
              <strong>
                <h2>
                  Éttermünk címe <LocalPizza />
                </h2>
              </strong>
              <p>Kucsera Ferenc u. 11. </p>
              <p>Szentendre</p>
              <strong>
                <h2>
                  Telefonszámunk <PhoneIcon />
                </h2>
              </strong>
              <p>06-70-547-1373</p>
              <p>vagy 06-26-301-588</p>

              <table>
                <tr>
                  <th>
                    <h2>
                      NYITVATARTÁS <ClockIcon />
                    </h2>
                  </th>
                </tr>
                <tr>
                  <td>HÉTFŐ</td>
                  <td>11:00 - 22:00</td>
                </tr>
                <tr>
                  <td>KEDD</td>
                  <td>11:00 - 22:00</td>
                </tr>
                <tr>
                  <td>SZERDA</td>
                  <td>11:00 - 22:00</td>
                </tr>
                <tr>
                  <td>CSÜTÖRTÖK</td>
                  <td>11:00 - 22:00</td>
                </tr>
                <tr>
                  <td>PÉNTEK</td>
                  <td>11:00 - 22:00</td>
                </tr>
                <tr>
                  <td>SZOMBAT</td>
                  <td>11:00 - 22:00</td>
                </tr>
                <tr>
                  <td>VASÁRNAP</td>
                  <td>11:00 - 22:00</td>
                </tr>
              </table>
              <h1>Szeretettel várunk!</h1>
              <h2>Nézz be hozzánk, ha erre jársz!</h2>
            </div>
          </div>
        </div>
      </Content>
      <Footer />
    </ImgContainer>
  );
}
