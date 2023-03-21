import { SafeArea } from "../utils/StyledComponents";
import { WhiteText } from "../utils/StyledComponents";
import { StyleSheet } from "react-native";

export default function PortfolioScreen() {
  return (
    <SafeArea>
      <WhiteText style={styles.title}>Portfolio Screen</WhiteText>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 15,
  },
});
