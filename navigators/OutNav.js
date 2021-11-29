import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Join from "../screens/Join";

const Nav = createNativeStackNavigator();

const OutNav = () => (
  <Nav.Navigator>
    <Nav.Screen name="Join" component={Join} />
  </Nav.Navigator>
);

export default OutNav;
