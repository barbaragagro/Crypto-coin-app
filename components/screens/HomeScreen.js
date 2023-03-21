import { SafeArea } from "../utils/StyledComponents";
import { WhiteText } from "../utils/StyledComponents";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import axios from "axios";
import { CoinItem } from "../mappingItem/CoinItem";

export default function HomeScreen() {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  callApi = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((result) => {
        setIsLoading(false);
        setResponse(result.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  const getCoinPrices = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    } else if (error) {
      return <Text>{error}</Text>;
    } else {
      return (
        <FlatList
          data={response}
          renderItem={({ item }) => (
            <CoinItem
              name={item.name}
              image={item.image}
              market_cap_rank={item.market_cap_rank}
              market_cap_change_percentage_24h={
                item.market_cap_change_percentage_24h
              }
              symbol={item.symbol}
              current_price={item.current_price}
              market_cap={item.market_cap}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      );
    }
  };
  return (
    <SafeArea>
      <View style={styles.container}>
        <WhiteText style={styles.title}>Top Assets</WhiteText>
        {getCoinPrices()}
        <StatusBar style="light" />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  title: {
    fontSize: 25,
    margin: 15,
  },
});
