import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image } from "react-native";
import { WhiteText } from "../utils/StyledComponents";

export const CoinItem = ({
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

const styles = StyleSheet.create({
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
