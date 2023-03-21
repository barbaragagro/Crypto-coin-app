import { SafeArea } from "../utils/StyledComponents";
import { WhiteText } from "../utils/StyledComponents";
import { StyleSheet } from "react-native";

export default function FavouritesScreen() {
  return (
    <SafeArea>
      <WhiteText style={styles.title}>Favourites Screen</WhiteText>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 15,
  },
});
