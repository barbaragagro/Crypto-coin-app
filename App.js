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
import ArrowDropDownIcon from "./assets/downArrow.png";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: black;
`;

const WhiteText = styled(Text)`
  color: white;
  padding: 2px;
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
    <View style={styles.coinLeftInfo}>
      <Image
        style={styles.image}
        source={{
          uri: image,
        }}
      />
      <View>
        <WhiteText style={styles.coinName}>{name}</WhiteText>
        <View style={styles.coinRank}>
          <View style={styles.rankNumber}>
            <WhiteText>{market_cap_rank}</WhiteText>
          </View>
          <WhiteText>{symbol.toUpperCase()}</WhiteText>
          <View>
            <WhiteText>
            <Image style={styles.downArrow} source={ArrowDropDownIcon} />
              {parseFloat(market_cap_change_percentage_24h).toFixed(2)}%
            </WhiteText>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.coinInfoRight}>
      <WhiteText style={styles.price}>
        ${current_price.toLocaleString("en-US")}
      </WhiteText>
      <WhiteText style={styles.price}>
        MCap {parseFloat(market_cap / 1000000000).toFixed(2)} B
      </WhiteText>
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
        {console.log(response)}
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
    marginVertical: 15,
  },
  coinItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "rgba(97, 97, 97, 0.3)",
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    padding: 10,
  },
  coinLeftInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinInfoRight: {
    alignItems: "flex-end",
  },
  coinRank: {
    flexDirection: "row",
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  rankNumber: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(97, 97, 97, 0.6)",
    paddingHorizontal: 2,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  coinName: {
    fontWeight: 500,
    fontSize: 18,
  },
  price: {
    fontSize: 15,
  },
  downArrow: {
    height: 10,
    width: 12,
    
  },
});
