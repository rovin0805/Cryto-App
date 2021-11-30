import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { getCoinHistory, getCoinInfo, getSymbol } from "../api";
import { Container } from "../components/shared";
import Loader from "../components/Loader";

const RowWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.Image`
  border-radius: 20px;
  width: 30px;
  height: 30px;
`;

const HeaderTitle = styled.Text`
  margin-left: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const Hedaer = ({ symbol }) => (
  <RowWrapper>
    <Icon source={{ uri: getSymbol(symbol) }} />
    <HeaderTitle>{symbol}</HeaderTitle>
  </RowWrapper>
);

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["coinInfo", id],
    getCoinInfo
  );
  const { isLoading: historyLoading, data: historyData } = useQuery(
    ["coinHistory", id],
    getCoinHistory
  );
  const loading = infoLoading || historyLoading;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Hedaer symbol={symbol} />,
    });
  }, []);

  return loading ? <Loader /> : <Container></Container>;
};

export default Detail;
