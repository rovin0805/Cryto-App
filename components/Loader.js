import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../colors";

const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Loader>
    <ActivityIndicator color="white" size="large" />
  </Loader>
);
