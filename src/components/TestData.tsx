import _ from 'lodash';
import React, { useContext } from 'react';
import StoreContext from '../context/StoreContext';
import styled from 'styled-components';

const ImgContainer = styled.div`
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
`;

export default function Test() {
  const { products } = useContext(StoreContext);
  const pizzaList: any = products.find((it: any) => it.type === 'pizzak');
  const garnish: any = products.find((it: any) => it.type === 'koret');
  const extrasList: any = products.find((it: any) => it.type === 'extras');

  console.log(extrasList);

  /* if (!_.isPlainObject(extrasList) || !Array.isArray(extrasList.items)) {
    return null;
  } */
  /* 
  const grouped_extras = extrasList.items.reduce((prev: any, curr: any) => {
    if (Array.isArray(prev[curr.type])) {
      return { ...prev, [curr.type]: [...prev[curr.type], curr] };
    }
    return { ...prev, [curr.type]: [curr] };
  }, {}); */

  return <h2>valami</h2>;
}
