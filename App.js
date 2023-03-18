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
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

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
            {market_cap_change_percentage_24h < 0 ? (
              <View style={styles.arrowsView}>
                <View style={styles.arrowDown}>
                  <AntDesign name="caretdown" size={15} color="red" />
                </View>
                <Text style={styles.redText}>
                  {parseFloat(market_cap_change_percentage_24h).toFixed(2)}%
                </Text>
              </View>
            ) : (
              <View style={styles.arrowsView}>
                <View style={styles.arrowUp}>
                  <AntDesign name="caretup" size={15} color="#13ba7b" />
                </View>
                <Text style={styles.greenText}>
                  {parseFloat(market_cap_change_percentage_24h).toFixed(2)}%
                </Text>
              </View>
            )}
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

const HomeScreen = () => {
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
        
      </View>
    </SafeArea>
  );
};

function PortfolioScreen() {
  return (
    <SafeArea>
      <WhiteText style={styles.title}>Portfolio Screen</WhiteText>
    </SafeArea>
  );
}

function FavouritesScreen() {
  return (
    <SafeArea>
      <WhiteText style={styles.title}>Favourites Screen</WhiteText>
    </SafeArea>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "black" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="graph-pie" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="star" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
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
    marginRight: 12,
  },
  rankNumber: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(97, 97, 97, 0.6)",
    paddingHorizontal: 4,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  coinName: {
    fontWeight: 500,
    fontSize: 18,
  },
  price: {
    fontSize: 15,
  },
  redText: {
    color: "red",
    padding: 2,
  },
  greenText: {
    color: "#13ba7b",
    padding: 2,
  },
  arrowsView: {
    flexDirection: "row",
    paddingHorizontal: 2,
  },
  arrowDown: {
    paddingTop: 2,
    paddingHorizontal: 2,
  },
  arrowUp: {
    paddingTop: 3,
    paddingHorizontal: 2,
  },
});
