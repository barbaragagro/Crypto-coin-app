import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: black;
`;

export const WhiteText = styled(Text)`
  color: white;
  padding: 2px;
`;
