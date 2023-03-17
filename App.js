import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: #041014;
  align-items: center;
  justify-content: center;
`;

const WhiteText = styled(Text)`
  color: white;
`;

const CoinItem = ({
  name,
  market_cap_rank,
  symbol,
  image,
  current_price,
  market_cap,
  market_cap_change_percentage_24h,
}) => (
  <View style={styles.coinItem}>
    <Image
      style={styles.image}
      source={{
        uri: image,
      }}
    />
    <View>
      <WhiteText>{name}</WhiteText>
    </View>
  </View>
);

export default function App() {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setResponse(result);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
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
            <CoinItem name={item.name} image={item.image} />
          )}
          keyExtractor={(item) => item.id}
        />
      );
    }
  };
  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>Top Assets</Text>
        {getCoinPrices()}
        <StatusBar style="auto" />
        {console.log(response)}
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  coinItem: {
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 50,
  },
});
