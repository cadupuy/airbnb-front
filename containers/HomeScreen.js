import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import colors from "../assets/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import RoomCard from "../components/RoomCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setRooms(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <StatusBar style="dark" />

      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <ScrollView>
          <View style={styles.homeContainer}>
            <View style={styles.header}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              ></Image>
            </View>

            <View style={styles.roomCards}>
              <FlatList
                data={rooms}
                renderItem={({ item }) => {
                  return <RoomCard room={item} />;
                }}
                keyExtractor={(item) => item._id}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  color: {
    color: colors.grey,
  },

  dark: {
    color: colors.black,
  },

  homeContainer: {
    marginHorizontal: 20,
  },

  header: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: colors.ligthgreyText,
    alignItems: "center",
  },

  logo: {
    width: 40,
    height: 40,
  },
});
