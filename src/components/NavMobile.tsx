import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { Popover } from '@material-ui/core';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const StyledNavLink = styled(NavLink)`
  color: forestgreen;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

  const Container = styled.div`
    display: none;
    @media only screen and (max-width: 1000px) {
      display: block;
    }
  `;
  return (
    <Container>
      <Button style={{ background: 'white', opacity: 0.5 }} size="large" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        MENU
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <StyledNavLink to="/pizza">
          <MenuItem onClick={handleClose}>Pizza</MenuItem>
        </StyledNavLink>
        <StyledNavLink to="/egeszseges">
          <MenuItem onClick={handleClose}>Egészséges ételek</MenuItem>
        </StyledNavLink>
        <StyledNavLink to="/etlap">
          <MenuItem onClick={handleClose}>Étlap</MenuItem>
        </StyledNavLink>
        <StyledNavLink to="/italok">
          <MenuItem onClick={handleClose}>Itallap</MenuItem>
        </StyledNavLink>
      </Popover>
    </Container>
  );
}
