import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import colors from "../assets/colors";

export default function SignInScreen({ setToken }) {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
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
        console.log(response.data.token);
        const userToken = response.data.token;
        setToken(userToken);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      }
    } else {
      setError("Paramètre(s) manquant(s)");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar style="dark" />
        <View style={styles.signInContainer}>
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
            <Text style={styles.error}>{error}</Text>

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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  color: {
    color: colors.grey,
  },

  dark: {
    color: colors.black,
  },

  error: {
    color: colors.red,
  },

  safeAreaView: {
    flex: 1,
  },
  signInContainer: {
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
    color: colors.grey,
  },

  form: {
    marginHorizontal: 40,
  },

  input: {
    width: "100%",
    paddingBottom: 5,
    marginTop: 30,
    borderBottomWidth: 2,
    borderColor: colors.borderColor,
  },

  inputError: {
    width: "100%",
    paddingBottom: 5,
    marginTop: 30,
    borderBottomWidth: 2,
    borderColor: colors.red,
  },

  login: {
    marginTop: 50,
    alignItems: "center",
  },

  loginButton: {
    color: colors.grey,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 80,
    paddingRight: 80,
    borderColor: colors.red,
    borderWidth: 3,
    borderRadius: 30,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 15,
  },
});
