import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import auth from "@react-native-firebase/auth";

const LogOut = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: crimson;
`;

export default () => {
  const logUserOut = async () => {
    await auth().signOut();
  };

  return (
    <TouchableOpacity onPress={logUserOut}>
      <LogOut>Log Out</LogOut>
    </TouchableOpacity>
  );
};
