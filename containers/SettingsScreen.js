import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../assets/colors";

export default function SettingsScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        console.log(userId);
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userId}`,
            },
          }
        );
        setEmail(response.data.email);
        setUsername(response.data.email);
        setDescription(response.data.description);

        setisLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!email && !username && !description) {
        setError("Paramètre(s) manquant(s)");
      } else {
        if (isPicture) {
          const response = await axios.put(
            `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
            {
              headers: {
                Authorization: `Bearer ${userId}`,
              },
            }
          );
        }

        const response = await axios.put(
          `https://express-airbnb-api.herokuapp.com/user/update`,
          {
            headers: {
              Authorization: `Bearer ${userId}`,
            },
          }
        );
      }
      setisLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.SafeAreaView}>
        <StatusBar style="dark" />
        <View style={styles.avatar}>
          <FontAwesome
            style={[styles.userImage, styles.color]}
            name="user-o"
            size={24}
            color="black"
          />
          <View>
            <MaterialIcons
              style={[styles.photos, styles.color]}
              name="photo-library"
              size={24}
              color="black"
            />
            <Entypo
              style={[styles.camera, styles.color]}
              name="camera"
              size={24}
              color="black"
            />
          </View>
        </View>
        <View style={styles.form}>
          <TextInput
            style={error !== "" ? styles.inputError : styles.input}
            placeholder="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={error !== "" ? styles.inputError : styles.input}
            placeholder="username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={error !== "" ? styles.descriptionError : styles.description}
            placeholder="Describe yourself in a few words..."
            multiline={true}
            numberOfLines={10}
            value={description}
            maxLength={200}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>
        <View style={styles.login}>
          <TouchableOpacity onPress={handleUpdate}>
            <Text style={[styles.loginButton]}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setToken(null);
            }}
          >
            <Text style={[styles.loginButton]}>Logout</Text>
          </TouchableOpacity>
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

  avatar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  userImage: {
    marginRight: 30,
    borderRadius: 43,
    padding: 30,
    borderWidth: 2,
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
    marginTop: 40,
    alignItems: "center",
    paddingBottom: 30,
  },

  photos: {
    marginBottom: 15,
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
    marginHorizontal: 50,
  },
});
