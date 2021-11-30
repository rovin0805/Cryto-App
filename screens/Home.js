import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useQuery } from "react-query";
import { getCoins } from "../api";
import Loader from "../components/Loader";
import { Container } from "../components/shared";
import Coin from "../components/Coin";
import LogOut from "../components/LogOut";

const Home = ({ navigation: { setOptions } }) => {
  const { isLoading, data } = useQuery("coins", getCoins);
  const [cleanData, setCleanData] = useState([]);

  useEffect(() => {
    if (data) {
      const cleanedData = data.filter(
        (coin) => coin.rank != 0 && coin.is_active && !coin.is_new
      );
      setCleanData(cleanedData);
    }
    setOptions({
      headerRight: () => <LogOut />,
    });
  }, [data]);

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      <FlatList
        data={cleanData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={{ width: "100%" }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <Coin index={index} symbol={item.symbol} />
        )}
      />
    </Container>
  );
};

export default Home;
