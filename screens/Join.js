import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { Btn, BtnText, Container, TextInput } from "../components/shared";

const Join = () => {
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
      await auth().createUserWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      switch (error.code) {
        case "auth/email-already-in-use": {
          Alert.alert("This email is already in use!");
        }
        case "auth/invalie-email": {
          Alert.alert("Write a valid email!");
        }
        case "auth/weak-password": {
          Alert.alert("Write a stronger password!");
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
      <Btn onPress={onSubmitPasswordEditing} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>Create Account</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Join;
