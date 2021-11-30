import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import styled from "styled-components/native";
import { Btn, BtnText, Container, TextInput } from "../components/shared";

const Text = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
  margin: 30px 0 10px 0;
`;

const Login = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInput = useRef();

  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };

  const onSubmitPasswordEditing = async () => {
    if (email === "" || password === "") {
      return Alert.alert("Fill in the form");
    }
    try {
      setLoading(true);
      await auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      switch (error.code) {
        case "auth/user-disabled": {
          Alert.alert("This user is disabled!");
        }
        case "auth/invalie-email": {
          Alert.alert("Write a valid email!");
        }
        case "auth/wrong-password": {
          Alert.alert("Write a correct password!");
        }
        case "auth/user-not-found": {
          Alert.alert("This user is not found!");
        }
      }
    }
  };

  return (
    <Container>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        returnKeyType="next"
        returnKeyLabel="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
      />
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn disabled={loading} onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>Log In</BtnText>
        )}
      </Btn>
      <Text>Don't have an account? </Text>
      <Btn onPress={() => navigate("Join")}>
        <BtnText>Join &rarr;</BtnText>
      </Btn>
    </Container>
  );
};

export default Login;
