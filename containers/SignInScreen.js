import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Dimensions } from "react-native";

import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      const userToken = "secret-token";
      setToken(userToken);
      alert("vous êtes connecté");
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <View style={styles.pageTitle}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          ></Image>
          <Text style={styles.title}>Sign in</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={error !== "" ? styles.inputError : styles.input}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={error !== "" ? styles.inputError : styles.input}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>

        <View style={styles.login}>
          <Text>{error}</Text>

          <TouchableOpacity onPress={handleSubmit}>
            <Text style={[styles.loginButton]}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.color}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    marginTop: 70,
  },

  pageTitle: {
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 25,
  },

  form: {
    marginHorizontal: 40,
  },

  input: {
    width: "100%",
    paddingBottom: 5,
    marginTop: 30,
    borderBottomWidth: 1,
  },

  inputError: {
    width: "100%",
    paddingBottom: 5,
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: "red",
  },

  login: {
    marginTop: 50,
    alignItems: "center",
  },

  loginButton: {
    color: "red",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 80,
    paddingRight: 80,
    borderColor: "red",
    borderWidth: 3,
    borderRadius: 30,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 15,
  },
});
