import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { getCoinHistory, getCoinInfo, getSymbol } from "../api";
import { Container } from "../components/shared";
import Loader from "../components/Loader";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";

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

const Header = ({ symbol }) => (
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
  const [victoryData, setVictoryData] = useState();
  const loading = infoLoading || historyLoading || !victoryData;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header symbol={symbol} />,
    });
  }, []);

  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((coin) => ({
          x: new Date(coin.timestamp).getTime(),
          y: coin.price,
        }))
      );
    }
  }, [historyData]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <VictoryChart height={360}>
        <VictoryLine
          animate
          interpolation="monotoneX"
          data={victoryData}
          style={{ data: { stroke: "#1abc9c" } }}
        />
        <VictoryScatter
          data={victoryData}
          style={{ data: { fill: "#1abc9c" } }}
        />
      </VictoryChart>
    </Container>
  );
};

export default Detail;
