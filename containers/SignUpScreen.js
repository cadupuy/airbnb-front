import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import colors from "../assets/colors";

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              password,
              username,
              description,
              confirmPassword,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const userToken = response.data.token;
          const userId = response.data.id;
          setToken(userToken);
          setId(userId);
        } catch (error) {
          if (error.response) {
            setError(error.response.data.message);
          }
        }
      } else {
        setError("Les mots de passe doivent être identiques");
      }
    } else {
      setError("Paramètre(s) manquant(s)");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar style="dark" />
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
              placeholder="username"
              onChangeText={(text) => {
                setUsername(text);
              }}
            />
            <TextInput
              style={
                error !== "" ? styles.descriptionError : styles.description
              }
              placeholder="Describe yourself in a few words..."
              multiline={true}
              numberOfLines={10}
              maxLength={200}
              onChangeText={(text) => {
                setDescription(text);
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
            <TextInput
              style={error !== "" ? styles.inputError : styles.input}
              placeholder="confirm password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
            />
          </View>

          <View style={styles.login}>
            <Text style={styles.error}>{error}</Text>

            <TouchableOpacity onPress={handleSubmit}>
              <Text style={[styles.loginButton]}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.color}>
                Already have an account ? Sign in
              </Text>
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
    backgroundColor: colors.white,
  },
  container: {
    marginTop: 10,
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

  description: {
    width: "100%",
    height: 90,
    paddingTop: 5,
    marginTop: 30,
    borderWidth: 2,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    borderColor: colors.borderColor,
  },

  descriptionError: {
    width: "100%",
    paddingBottom: 5,
    marginTop: 30,
    borderWidth: 2,
    height: 100,
    paddingLeft: 10,
    borderColor: colors.red,
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
    paddingBottom: 30,
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
