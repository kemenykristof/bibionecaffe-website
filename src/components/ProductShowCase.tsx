import React from 'react';
import styled from 'styled-components';

const ImgStyle = styled.img`
  cursor: pointer;
  border-radius: 1px;
  flex: 1;
  max-width: 25%;
  max-height: 350px;
  transition: transform 0.7s;
  &:hover {
    transform: scale(1.02);
    opacity: 0.90;
    border-radius: 5px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export default function ProductShowCase() {
  return (
    <div>
      <ImgContainer>
        <ImgStyle src={require('../assets/bibionepizza2.jpg')} alt="logo" />
        <ImgStyle src={require('../assets/bibionelightfood.jpg')} alt="logo" />
        <ImgStyle src={require('../assets/bibionefood.jpg')} alt="logo" />
        <ImgStyle src={require('../assets/bibionekoktel.jpg')} alt="logo" />
      </ImgContainer>
    </div>
  );
}
