import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.85em;
  opacity: 0.85;
  background: black;
  color: white;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <div>
        Nyitvatartás
        <p>Hétfő - Vasárnap: 11:00 - 22:00</p>
      </div>
      <div>
        Rendelés felvétel
        <p>06 70 547 1373</p>
        <p>06 26 301 588</p>
      </div>
    </FooterWrapper>
  );
}
