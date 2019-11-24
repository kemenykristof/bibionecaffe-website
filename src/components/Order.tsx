import React, { useContext, useState } from 'react';
import BasketIcon from '@material-ui/icons/ShoppingBasketRounded';
import StoreContext from '../context/StoreContext';
import { Badge, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import Background from '../assets/pizzaDesktop.jpg';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NavMobile from './NavMobile';

interface State {
  city: string;
}

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
`;

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 40px;
`;

const StyledBasket = styled(BasketIcon)`
color: white;
cursor: pointer;
align-items:center;
  `;

interface Props {}

export default function Cart(props: Props) {
  const store = useContext(StoreContext);
  const context = useContext(StoreContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [values, setValues] = React.useState<State>({
    city: 'Szentendre'
  });

  const [paymentValue, setPaymentValue] = React.useState('cash');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentValue((event.target as HTMLInputElement).value);
  };

  const handleChangeCity = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const deliveryCities = ['Szentendre', 'Pomáz', 'Budakalász', 'Leányfalu'];

  console.log(firstName, lastName, phoneNumber, address, email);

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
        {context.cart.length !== 0 && (
          <div
            style={{
              borderRadius: '5px',
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              background: 'white',
              opacity: 0.9,
              height: 'auto',
              maxWidth: '800px',
              margin: 'auto'
            }}
          >
            <span>Rendelés összege: </span>
            {store.cart.reduce((count, curItem) => {
              return count + curItem.quantity * curItem.price;
            }, 0)}
            Ft
            <div>
              <form
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly',
                  background: 'white',
                  opacity: 0.95
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder=""
                  type="text"
                  name="lastName"
                  id="outlined-required"
                  label="Vezetéknév"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder=""
                  type="text"
                  name="lastName"
                  id="outlined-required"
                  label="Keresztnév"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=""
                  type="email"
                  name="email"
                  required
                  id="outlined-email-input"
                  label="E-mail"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  style={{ width: '210px' }}
                  required
                  id="outlined-select-city"
                  select
                  label="Város"
                  value={values.city}
                  onChange={handleChangeCity('city')}
                  variant="outlined"
                  margin="normal"
                  helperText="Kérem válasszon várost!"
                >
                  {deliveryCities.map((city: any) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder=""
                  type="text"
                  name="address"
                  id="outlined-required"
                  label="Cím"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder=""
                  type="text"
                  name="phoneNumber"
                  id="outlined-required"
                  label="Telefonszám"
                  defaultValue=""
                  margin="normal"
                  variant="outlined"
                />

                <p style={{ color: 'red', fontWeight: 'bold' }}>
                  Jelenleg csak ezekre a városokra szállítunk ki: Szentendre, Budakalász, Leányfalu, Pomáz
                </p>
                <FormControl component="fieldset">
                  <FormLabel style={{ fontWeight: 'bold', color: 'steelblue', textAlign: 'start' }} component="legend">
                    Fizetés módja
                  </FormLabel>
                  <RadioGroup aria-label="gender" name="payment options" value={paymentValue} onChange={handleChange}>
                    <FormControlLabel style={{ color: 'forestgreen' }} value="cash" control={<Radio color="default" />} label="Készpénz átvételkor" />
                    <FormControlLabel
                      style={{ color: 'forestgreen' }}
                      value="card"
                      control={<Radio color="default" />}
                      label="Bankkártya átvételkor"
                    />
                    <FormControlLabel value="disabled" disabled control={<Radio />} label="SZÉP kártya átvételkor (hamarosan)" />
                  </RadioGroup>
                </FormControl>
              </form>
              <div style={{ backgroundColor: '#1976d2', color: 'white', padding: 15, cursor: 'pointer', width: 'inherit', borderRadius: '5px' }}>
                RENDELÉS
              </div>
            </div>
          </div>
        )}
      </Content>
    </ImgContainer>
  );
}
